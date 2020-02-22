import {Observable, of} from 'rxjs';
import {Material} from 'three';
import {DqNodeComponent} from '../dq-node/dq-node.component';
import {Element3D} from '../model/element';

export abstract class DqMaterialComponent extends DqNodeComponent {
  constructor() {
    super();
  }

  abstract createMaterial(): Material;

  generate(): Observable<Element3D[]> {
    return of([this.createMaterial()]);
  }

  getModelMaterial(): Material {
    const model = this.getModel();
    if (model === null || model.length === 0) {
      return null;
    }
    const element = model[0];
    if (element instanceof Material) {
      return element;
    }
    return null;
  }
}
