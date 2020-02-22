import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AmbientLight} from 'three';
import {DqLightComponent} from '../dq-light/dq-light.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';
import {Element3D} from '../model/element';

@Component({
  selector: 'dq-light-ambient',
  template: '',
  providers: [{provide: DqNodeComponent, useExisting: DqLightAmbientComponent}]
})
export class DqLightAmbientComponent extends DqLightComponent {
  constructor() {
    super();
  }

  generate(): Observable<Element3D[]> {
    const {color, intensity} = this;
    return of([new AmbientLight(color, intensity)]);
  }
}
