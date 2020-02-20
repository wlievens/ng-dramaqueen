import {EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {Object3D} from 'three';
import {DqContainerComponent} from '../dq-container/dq-container.component';
import {Vector} from '../model/vector';

export abstract class DqNodeComponent implements OnChanges, OnInit {
  @Input()
  position: Vector;

  @Output()
  select: EventEmitter<DqNodeComponent> = new EventEmitter();

  @Output()
  hover: EventEmitter<DqNodeComponent> = new EventEmitter();

  private selectWired: boolean = false;
  private hoverWired: boolean = false;
  private parent: DqContainerComponent;
  private model: Object3D[] = [];

  emitHover(): boolean {
    if (this.hoverWired) {
      this.hover.emit(this);
      return true;
    }
    return false;
  }

  emitSelect(): boolean {
    if (this.selectWired) {
      this.select.emit(this);
      return true;
    }
    return false;
  }

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

  ngOnInit() {
    this.selectWired = this.select.observers.length > 0;
    this.hoverWired = this.hover.observers.length > 0;
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
      model.forEach(object => object.userData = this);
      model.forEach(object => this.transform(object));
      this.setModel(model);
    });
  }

  private transform(object: Object3D) {
    const {position} = this;
    if (position) {
      object.position.set(position.x || 0, position.y || 0, position.z || 0);
    }
  }
}
