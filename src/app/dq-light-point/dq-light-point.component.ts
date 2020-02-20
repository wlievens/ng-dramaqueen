import {Component, Input} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Mesh, MeshBasicMaterial, Object3D, PointLight, SphereBufferGeometry} from 'three';
import {DqLightComponent} from '../dq-light/dq-light.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';

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

  generate(): Observable<Object3D[]> {
    const {color, intensity} = this;
    const light = new PointLight(color, intensity);
    if (this.debug) {
      light.add(new Mesh(new SphereBufferGeometry(0.1, 16, 8), new MeshBasicMaterial({color: 0xff00ff})));
    }
    return of([light]);
  }
}
