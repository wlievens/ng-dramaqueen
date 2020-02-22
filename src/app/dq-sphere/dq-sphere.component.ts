import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {SphereBufferGeometry} from 'three';
import {DqGeometryComponent} from '../dq-geometry/dq-geometry.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';
import {Element3D} from '../model/element';

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

  generate(): Observable<Element3D[]> {
    return this.createMesh(new SphereBufferGeometry(this.radius, 32, 16));
  }
}
