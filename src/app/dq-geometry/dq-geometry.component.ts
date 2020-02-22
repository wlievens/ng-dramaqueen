import {Input} from '@angular/core';
import {Observable, of} from 'rxjs';
import {BufferGeometry, Geometry, Mesh, MeshPhongMaterial} from 'three';
import {DqMaterialComponent} from '../dq-material/dq-material.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';
import {Element3D} from '../model/element';

export abstract class DqGeometryComponent extends DqNodeComponent {
  @Input()
  color: string = '#000000';

  constructor() {
    super();
  }

  protected createMesh(geometry: Geometry | BufferGeometry): Observable<Element3D[]> {
    const {children, color} = this;
    let material = null;
    if (children) {
      const materialComponent: DqMaterialComponent = children.find(child => child instanceof DqMaterialComponent) as DqMaterialComponent;
      if (materialComponent) {
        material = materialComponent.getModelMaterial();
      }
    }
    if (!material) {
      material = new MeshPhongMaterial({color});
    }
    const mesh = new Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    return of([(mesh)]);
  }
}
