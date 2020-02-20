import {AfterViewInit, ContentChildren, QueryList} from '@angular/core';
import {DqNodeComponent} from '../dq-node/dq-node.component';

export abstract class DqContainerComponent extends DqNodeComponent implements AfterViewInit {
  @ContentChildren(DqNodeComponent)
  children: QueryList<DqNodeComponent>;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.buildScene();
    this.children.changes.subscribe(changes => {
      this.buildScene();
    });
  }

  abstract onModelUpdate(child: DqNodeComponent);

  private buildScene() {
    this.children.filter(child => child.getParent() !== this).forEach(child => child.setParent(this));
  }
}
