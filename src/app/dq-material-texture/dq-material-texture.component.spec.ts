import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DqMaterialTextureComponent} from './dq-material-texture.component';

describe('DqMaterialTextureComponent', () => {
  let component: DqMaterialTextureComponent;
  let fixture: ComponentFixture<DqMaterialTextureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DqMaterialTextureComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqMaterialTextureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
