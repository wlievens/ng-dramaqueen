import {Component, Input} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Material, MeshPhongMaterial} from 'three';
import {DqMaterialComponent} from '../dq-material/dq-material.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';

@Component({
  selector: 'dq-material-color',
  template: '',
  providers: [{provide: DqNodeComponent, useExisting: DqMaterialColorComponent}]
})
export class DqMaterialColorComponent extends DqMaterialComponent {
  @Input()
  color: string = '#000000';

  constructor() {
    super();
  }

  protected createMaterial(): Observable<Material> {
    const {color} = this;
    return of(new MeshPhongMaterial({color}));
  }
}
