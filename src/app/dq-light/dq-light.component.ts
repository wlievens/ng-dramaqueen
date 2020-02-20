import {Input} from '@angular/core';
import {DqNodeComponent} from '../dq-node/dq-node.component';

export abstract class DqLightComponent extends DqNodeComponent {
  @Input()
  color: string = '#ffffff';

  @Input()
  intensity: number = 1.0;

  constructor() {
    super();
  }
}
