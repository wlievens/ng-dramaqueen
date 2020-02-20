import {Component, Input} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Mesh, MeshPhongMaterial, Object3D} from 'three';
import {DqNodeComponent} from '../dq-node/dq-node.component';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';

@Component({
  selector: 'dq-model',
  template: '',
  providers: [{provide: DqNodeComponent, useExisting: DqModelComponent}]
})
export class DqModelComponent extends DqNodeComponent {
  @Input()
  url: string = null;

  @Input()
  color: string = '#000000';

  constructor() {
    super();
  }

  generate(): Observable<Object3D[]> {
    const {url} = this;
    if (!url) {
      return of([]);
    }
    return new Observable<Object3D[]>(observer => {
      new STLLoader().load(url, geometry => {
        const {color} = this;
        const mesh = new Mesh(geometry, new MeshPhongMaterial({color}));
        observer.next([mesh]);
      });
    });
  }
}
