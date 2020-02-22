import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {BoxGeometry} from 'three';
import {DqGeometryComponent} from '../dq-geometry/dq-geometry.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';
import {Element3D} from '../model/element';
import {Vector} from '../model/vector';

@Component({
  selector: 'dq-cube',
  template: '',
  providers: [{provide: DqNodeComponent, useExisting: DqCubeComponent}]
})
export class DqCubeComponent extends DqGeometryComponent {
  @Input()
  size: Vector = null;

  constructor() {
    super();
  }

  generate(): Observable<Element3D[]> {
    const {size} = this;
    const sizeX = size ? size.x : 1;
    const sizeY = size ? size.y : 1;
    const sizeZ = size ? size.z : 1;
    return this.createMesh(new BoxGeometry(sizeX, sizeY, sizeZ));
  }
}
