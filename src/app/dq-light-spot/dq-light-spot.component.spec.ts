import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DqLightSpotComponent} from './dq-light-spot.component';

describe('DqLightSpotComponent', () => {
  let component: DqLightSpotComponent;
  let fixture: ComponentFixture<DqLightSpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DqLightSpotComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqLightSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
