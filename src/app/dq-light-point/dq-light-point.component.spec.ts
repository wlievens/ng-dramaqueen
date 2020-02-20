import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DqLightPointComponent} from './dq-light-point.component';

describe('DqLightPointComponent', () => {
  let component: DqLightPointComponent;
  let fixture: ComponentFixture<DqLightPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DqLightPointComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqLightPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
