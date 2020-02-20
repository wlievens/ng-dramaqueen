import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {BoxGeometry, Object3D} from 'three';
import {DqGeometryComponent} from '../dq-geometry/dq-geometry.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';

@Component({
  selector: 'dq-cube',
  template: '',
  providers: [{provide: DqNodeComponent, useExisting: DqCubeComponent}]
})
export class DqCubeComponent extends DqGeometryComponent {
  constructor() {
    super();
  }

  generate(): Observable<Object3D[]> {
    return this.createMesh(new BoxGeometry());
  }
}
