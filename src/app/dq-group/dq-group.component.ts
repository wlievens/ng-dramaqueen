import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Group, Object3D} from 'three';
import {DqContainerComponent} from '../dq-container/dq-container.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';

@Component({
  selector: 'dq-group',
  template: '',
  providers: [{provide: DqNodeComponent, useExisting: DqGroupComponent}]
})
export class DqGroupComponent extends DqContainerComponent {
  group: Group;

  constructor() {
    super();
    this.group = new Group();
  }

  onModelUpdate(child: DqNodeComponent) {
    const {group} = this;
    while (group.children.length) {
      group.remove(group.children[group.children.length - 1]);
    }
    this.children
      .filter(element => element !== this)
      .forEach(element => element.getModel().forEach(object => group.add(object)));
  }

  generate(): Observable<Object3D[]> {
    return of([this.group]);
  }
}
