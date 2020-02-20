import {Input, OnChanges, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {Object3D} from 'three';
import {DqContainerComponent} from '../dq-container/dq-container.component';
import {Vector} from '../model/vector';

export abstract class DqNodeComponent implements OnChanges {
  @Input()
  position: Vector;

  private parent: DqContainerComponent;
  private model: Object3D[] = [];

  abstract generate(): Observable<Object3D[]>;

  getModel(): Object3D[] {
    return this.model;
  }

  getParent(): DqContainerComponent {
    return this.parent;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('position' in changes) {
      this.model.forEach(object => this.transform(object));
      if (Object.keys(changes).length === 1) {
        return;
      }
    }
    this.regenerate();
  }

  setParent(parent: DqContainerComponent) {
    this.parent = parent;
    this.regenerate();
  }

  protected setModel(model: Object3D[]) {
    this.model = model;
    if (this.parent) {
      this.parent.onModelUpdate(this);
    }
  }

  private regenerate() {
    this.generate().subscribe(model => {
      model.forEach(object => this.transform(object));
      this.setModel(model);
    });
  }

  private transform(object: Object3D) {
    const {position} = this;
    if (position && position.x) {
      object.position.x = position.x;
    }
    if (position && position.y) {
      object.position.y = position.y;
    }
    if (position && position.z) {
      object.position.z = position.z;
    }
    return object;
  }
}
