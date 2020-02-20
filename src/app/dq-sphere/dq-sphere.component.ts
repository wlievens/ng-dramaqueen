import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {Object3D, SphereBufferGeometry} from 'three';
import {DqGeometryComponent} from '../dq-geometry/dq-geometry.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';

@Component({
  selector: 'dq-sphere',
  template: '',
  providers: [{provide: DqNodeComponent, useExisting: DqSphereComponent}]
})
export class DqSphereComponent extends DqGeometryComponent {
  @Input()
  radius: number = 0.5;

  constructor() {
    super();
  }

  generate(): Observable<Object3D[]> {
    return this.createMesh(new SphereBufferGeometry(this.radius, 32, 16));
  }
}
