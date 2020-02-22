import {Component, Input} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Mesh, MeshPhongMaterial} from 'three';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import {DqNodeComponent} from '../dq-node/dq-node.component';
import {Element3D} from '../model/element';

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

  generate(): Observable<Element3D[]> {
    const {url} = this;
    if (!url) {
      return of([]);
    }
    return new Observable<Element3D[]>(observer => {
      new STLLoader().load(url, geometry => {
        const {color} = this;
        const mesh = new Mesh(geometry, new MeshPhongMaterial({color}));
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        observer.next([mesh]);
      });
    });
  }
}
