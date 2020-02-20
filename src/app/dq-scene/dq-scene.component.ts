import {AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {ResizedEvent} from 'angular-resize-event';
import {Observable, of} from 'rxjs';
import {BasicShadowMap, Color, Object3D, PerspectiveCamera, Raycaster, Scene, Vector3, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {DqGroupComponent} from '../dq-group/dq-group.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';

@Component({
  selector: 'dq-scene',
  templateUrl: './dq-scene.component.html',
  styleUrls: ['./dq-scene.component.less']
})
export class DqSceneComponent extends DqGroupComponent implements OnInit, AfterViewInit {
  @Output()
  hoverClear: EventEmitter<any> = new EventEmitter();

  @ViewChild('scenecontainer', {read: ElementRef})
  private sceneContainer: ElementRef;

  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;
  private scene: Scene;
  private rayCaster: Raycaster;
  private lastMouseXY: { x: number, y: number } = null;
  private lastMouseClicked = false;
  private lastHoverEmitted: DqNodeComponent = null;

  constructor(private ngZone: NgZone) {
    super();
  }

  ngAfterViewInit() {
    const scene = new Scene();
    scene.background = new Color(0xe5e5e5);
    this.scene = scene;
    super.ngAfterViewInit();

    const container: HTMLDivElement = this.sceneContainer.nativeElement;
    if (!container) {
      return;
    }

    const renderer = new WebGLRenderer();

    const camera = new PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.x = 0;
    camera.position.y = 3;
    camera.position.z = 8;
    camera.lookAt(new Vector3(0, 0, 0));
    this.camera = camera;

    renderer.setViewport(0, 0, container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = BasicShadowMap;
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    this.rayCaster = new Raycaster();

    this.animate();
  }

  onModelUpdate(child: DqNodeComponent) {
    const scene = this.scene;
    while (scene.children.length > 0) {
      scene.remove(scene.children[scene.children.length - 1]);
    }
    this.children
      .filter(element => element !== this)
      .forEach(element => element.getModel().forEach(object => scene.add(object)));
  }

  generate(): Observable<Object3D[]> {
    return of([]);
  }

  ngOnInit() {
  }

  onMouseDown(event: MouseEvent) {
    this.lastMouseClicked = true;
    this.registerMouseXY(event);
  }

  onMouseMove(event: MouseEvent) {
    if (!this.lastMouseClicked) {
      this.registerMouseXY(event);
    }
  }

  onResized(event: ResizedEvent) {
    const container: HTMLDivElement = this.sceneContainer.nativeElement;
    const width = event.newWidth;
    const height = event.newHeight;
    this.renderer.setViewport(0, 0, width, height);
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  private animate() {
    const self = this;

    function render() {
      const {scene, camera, lastMouseXY, lastMouseClicked} = self;

      self.ngZone.runOutsideAngular(() => requestAnimationFrame(render));

      if (lastMouseXY) {
        self.rayCaster.setFromCamera(lastMouseXY, camera);
        const intersections = self.rayCaster.intersectObjects(scene.children, true);
        if (intersections.length > 0) {
          let emitted = false;
          for (let i = 0; i < intersections.length; ++i) {
            const intersection = intersections[i];
            const object = intersection.object;
            const node = object.userData;
            if (node instanceof DqNodeComponent) {
              if (lastMouseClicked) {
                emitted = node.emitSelect();
                if (emitted) {
                  break;
                }
              } else {
                emitted = node.emitHover();
                if (emitted) {
                  self.lastHoverEmitted = node;
                  break;
                }
              }
            }
          }
          if (!emitted && !lastMouseClicked && self.lastHoverEmitted) {
            self.hoverClear.emit();
            self.lastHoverEmitted = null;
          }
          self.lastMouseXY = null;
          self.lastMouseClicked = false;
        }
      }

      self.renderer.render(scene, camera);
    }

    render();
  }

  private registerMouseXY(event: MouseEvent) {
    const container: HTMLDivElement = this.sceneContainer.nativeElement;
    const x = event.offsetX / container.clientWidth * 2 - 1;
    const y = event.offsetY / container.clientHeight * -2 + 1;
    this.lastMouseXY = {x, y};
  }
}
