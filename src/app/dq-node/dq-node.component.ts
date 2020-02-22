import {AfterViewInit, ContentChildren, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {Object3D} from 'three';
import {DqContainerComponent} from '../dq-container/dq-container.component';
import {Element3D} from '../model/element';
import {Vector} from '../model/vector';

export abstract class DqNodeComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {
  @Input()
  position: Vector;

  @Input()
  rotation: Vector;

  @Input()
  scale: Vector;

  @Output()
  select: EventEmitter<DqNodeComponent> = new EventEmitter();

  @Output()
  hover: EventEmitter<DqNodeComponent> = new EventEmitter();

  @ContentChildren(DqNodeComponent)
  children: QueryList<DqNodeComponent>;

  private selectWired: boolean = false;
  private hoverWired: boolean = false;
  private parent: DqContainerComponent;
  private model: Element3D[] = [];

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

  abstract generate(): Observable<Element3D[]>;

  getModel(): Element3D[] {
    return this.model;
  }

  getParent(): DqContainerComponent {
    return this.parent;
  }

  ngAfterViewInit() {
    this.propagateParentToChildren();
    this.children.changes.subscribe(changes => {
      this.propagateParentToChildren();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('position' in changes) {
      this.model.filter(object => object instanceof Object3D).forEach(object => this.transform(object as Object3D));
      if (Object.keys(changes).length === 1) {
        return;
      }
    }
    this.generateAndSetModel();
  }

  ngOnDestroy() {
    this.setModel([]);
  }

  ngOnInit() {
    this.selectWired = this.select.observers.length > 0;
    this.hoverWired = this.hover.observers.length > 0;
  }

  setParent(parent: DqContainerComponent) {
    this.parent = parent;
    this.generateAndSetModel();
  }

  protected onChildUpdate(child: DqNodeComponent) {
    this.generateAndSetModel();
  }

  protected setModel(model: Element3D[]) {
    this.model = model;
    if (this.parent) {
      this.parent.onChildUpdate(this);
    }
  }

  private generateAndSetModel() {
    this.generate().subscribe(model => {
      model.forEach(object => object.userData = this);
      model.filter(object => object instanceof Object3D).forEach(object => this.transform(object as Object3D));
      this.setModel(model);
    });
  }

  private propagateParentToChildren() {
    this.children
      .filter(element => element !== this)
      .filter(element => element.getParent() !== this)
      .forEach(child => child.setParent(this));
  }

  private transform(object: Object3D) {
    const {position, rotation, scale} = this;
    if (position) {
      object.position.set(position.x || 0, position.y || 0, position.z || 0);
    }
    if (rotation) {
      const factor = Math.PI / 180;
      object.rotation.set(factor * rotation.x || 0, factor * rotation.y || 0, factor * rotation.z || 0);
    }
    if (scale) {
      object.scale.set(scale.x || 0, scale.y || 0, scale.z || 0);
    }
  }
}
