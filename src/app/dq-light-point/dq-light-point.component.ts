import {Component, Input} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CameraHelper, Mesh, MeshBasicMaterial, PointLight, SphereBufferGeometry} from 'three';
import {DqLightComponent} from '../dq-light/dq-light.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';
import {Element3D} from '../model/element';

@Component({
  selector: 'dq-light-point',
  template: '',
  providers: [{provide: DqNodeComponent, useExisting: DqLightPointComponent}]
})
export class DqLightPointComponent extends DqLightComponent {
  @Input()
  debug: boolean = false;

  constructor() {
    super();
  }

  generate(): Observable<Element3D[]> {
    const {color, intensity} = this;
    const light = new PointLight(color, intensity);
    light.castShadow = true;
    light.shadow.camera.near = 0.01;
    light.shadow.camera.far = 100;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    if (this.debug) {
      light.add(new Mesh(new SphereBufferGeometry(0.1, 16, 8), new MeshBasicMaterial({color: 0xff00ff})));
      return of([light, new CameraHelper(light.shadow.camera)]);
    }
    return of([light]);
  }
}
