import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DqLightAmbientComponent} from './dq-light-ambient.component';

describe('DqLightAmbientComponent', () => {
  let component: DqLightAmbientComponent;
  let fixture: ComponentFixture<DqLightAmbientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DqLightAmbientComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqLightAmbientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
