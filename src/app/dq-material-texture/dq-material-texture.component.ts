import {Component, Input} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Material, MeshBasicMaterial, sRGBEncoding, TextureLoader} from 'three';
import {DqMaterialComponent} from '../dq-material/dq-material.component';
import {DqNodeComponent} from '../dq-node/dq-node.component';

@Component({
  selector: 'dq-material-texture',
  template: '',
  providers: [{provide: DqNodeComponent, useExisting: DqMaterialTextureComponent}]
})
export class DqMaterialTextureComponent extends DqMaterialComponent {
  @Input()
  color: string = '#000000';

  @Input()
  url: string;

  constructor() {
    super();
  }

  protected  createMaterial(): Observable<Material> {
    const {color, url} = this;
    if (!url) {
      return of(new MeshBasicMaterial({color}));
    }
    return new Observable<Material>(observer => {
      new TextureLoader().load(url, texture => {
        texture.encoding = sRGBEncoding;
        const material = new MeshBasicMaterial({color, map: texture});
        observer.next(material);
      });
    });
  }
}
