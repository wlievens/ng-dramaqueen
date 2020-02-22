import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Material} from 'three';
import {DqNodeComponent} from '../dq-node/dq-node.component';
import {Element3D} from '../model/element';

export abstract class DqMaterialComponent extends DqNodeComponent {
  constructor() {
    super();
  }

  generate(): Observable<Element3D[]> {
    return this.createMaterial().pipe(map(material => [material]));
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

  protected abstract createMaterial(): Observable<Material>;
}
