import {Input} from '@angular/core';
import {Observable, of} from 'rxjs';
import {BufferGeometry, Geometry, Mesh, MeshPhongMaterial, Object3D} from 'three';
import {DqNodeComponent} from '../dq-node/dq-node.component';
import {Vector} from '../model/vector';

export abstract class DqGeometryComponent extends DqNodeComponent {
  @Input()
  color: string = '#000000';

  @Input()
  size: Vector = null;

  constructor() {
    super();
  }

  protected createMesh(geometry: Geometry | BufferGeometry): Observable<Object3D[]> {
    const {color} = this;
    const mesh = new Mesh(geometry, new MeshPhongMaterial({color}));
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    return of([(mesh)]);
  }
}
