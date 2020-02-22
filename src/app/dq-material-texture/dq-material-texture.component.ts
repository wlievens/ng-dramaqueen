import {Component, Input} from '@angular/core';
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
  url: string;

  constructor() {
    super();
  }

  createMaterial(): Material {
    const {url} = this;
    if (!url) {
      return new MeshBasicMaterial({color: '0xff00ff'});
    }
    const loader = new TextureLoader();
    const material = new MeshBasicMaterial();
    loader.load(url, texture => {
      texture.encoding = sRGBEncoding;
      material.map = texture;
      material.needsUpdate = true;
    });
    return material;
  }
}
