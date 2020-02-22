import {Component, Input, SimpleChanges} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Group, Mesh, MeshBasicMaterial, SphereBufferGeometry, SpotLight} from 'three';
import {DqLightComponent} from '../dq-light/dq-light.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';
import {Element3D} from '../model/element';
import {Vector} from '../model/vector';

@Component({
  selector: 'dq-light-spot',
  template: '',
  providers: [{provide: DqNodeComponent, useExisting: DqLightSpotComponent}]
})
export class DqLightSpotComponent extends DqLightComponent {
  @Input()
  target: Vector;

  @Input()
  debug: boolean = false;

  constructor() {
    super();
  }

  generate(): Observable<Element3D[]> {
    const {color, intensity, target, debug} = this;
    const light = new SpotLight(color, intensity);
    light.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.camera.near = 0.01;
    light.shadow.camera.far = 20;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    if (debug) {
      light.target = new Mesh(new SphereBufferGeometry(0.1, 16, 8), new MeshBasicMaterial({color: 0xff00ff}));
    }
    if (target) {
      light.target.position.set(target.x, target.y, target.z);
    }
    const lightGroup = new Group();
    lightGroup.add(light);
    lightGroup.add(light.target);
    if (this.debug) {
      light.add(new Mesh(new SphereBufferGeometry(0.1, 16, 8), new MeshBasicMaterial({color: 0x880088})));
    }
    return of([lightGroup]);
  }

  protected updateForChanges(changes: SimpleChanges): boolean {
    if ('target' in changes && Object.keys(changes).length === 1) {
      const {target} = this;
      const model = this.getModel();
      if (model.length > 0) {
        const light = (model[0] as Group).children[0] as SpotLight;
        if (target) {
          light.target.position.set(target.x || 0, target.y || 0, target.z || 0);
        } else {
          light.target.position.set(0, 0, 0);
        }
      }
      return true;
    }
    return false;
  }
}
