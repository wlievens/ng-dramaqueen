import {Input} from '@angular/core';
import {Observable, of} from 'rxjs';
import {BufferGeometry, Geometry, Mesh, MeshPhongMaterial, Object3D} from 'three';
import {DqNodeComponent} from '../dq-node/dq-node.component';

export abstract class DqGeometryComponent extends DqNodeComponent {
  @Input()
  color: string = '#000000';

  constructor() {
    super();
  }

  protected createMesh(geometry: Geometry | BufferGeometry): Observable<Object3D[]> {
    const {color} = this;
    return of([(new Mesh(geometry, new MeshPhongMaterial({color})))]);
  }
}
