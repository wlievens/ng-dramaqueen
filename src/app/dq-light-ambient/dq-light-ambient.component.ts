import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AmbientLight, Object3D} from 'three';
import {DqLightComponent} from '../dq-light/dq-light.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';

@Component({
  selector: 'dq-light-ambient',
  template: '',
  providers: [{provide: DqNodeComponent, useExisting: DqLightAmbientComponent}]
})
export class DqLightAmbientComponent extends DqLightComponent {
  constructor() {
    super();
  }

  generate(): Observable<Object3D[]> {
    const {color, intensity} = this;
    return of([new AmbientLight(color, intensity)]);
  }
}
