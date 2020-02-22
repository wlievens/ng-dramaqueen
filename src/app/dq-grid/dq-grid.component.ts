import {Component, Input} from '@angular/core';
import {Observable, of} from 'rxjs';
import {GridHelper, Object3D} from 'three';
import {DqNodeComponent} from '../dq-node/dq-node.component';
import {Element3D} from '../model/element';

@Component({
  selector: 'dq-grid',
  template: '',
  providers: [{provide: DqNodeComponent, useExisting: DqGridComponent}]
})
export class DqGridComponent extends DqNodeComponent {
  @Input()
  cell: number = 1;

  @Input()
  cells: number = 10;

  constructor() {
    super();
  }

  generate(): Observable<Element3D[]> {
    const {cell, cells} = this;
    return of([new GridHelper(cell * cells, cells, 0x333333, 0xbbbbbb)]);
  }
}
