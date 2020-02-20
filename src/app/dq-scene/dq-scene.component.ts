import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ResizedEvent} from 'angular-resize-event';
import {Observable, of} from 'rxjs';
import {Color, Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {DqGroupComponent} from '../dq-group/dq-group.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';

@Component({
  selector: 'dq-scene',
  templateUrl: './dq-scene.component.html',
  styleUrls: ['./dq-scene.component.less']
})
export class DqSceneComponent extends DqGroupComponent implements OnInit, AfterViewInit {
  @ViewChild('scenecontainer', {read: ElementRef})
  sceneContainer: ElementRef;

  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;
  private scene: Scene;

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
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

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
      self.ngZone.runOutsideAngular(() => requestAnimationFrame(render));
      self.renderer.render(self.scene, self.camera);
    }

    render();
  }
}
