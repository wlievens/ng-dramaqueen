import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DqMaterialColorComponent} from './dq-material-color.component';

describe('DqMaterialColorComponent', () => {
  let component: DqMaterialColorComponent;
  let fixture: ComponentFixture<DqMaterialColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DqMaterialColorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqMaterialColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
