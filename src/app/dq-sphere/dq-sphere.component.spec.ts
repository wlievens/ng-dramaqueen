import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DqSphereComponent} from './dq-sphere.component';

describe('DqSphereComponent', () => {
  let component: DqSphereComponent;
  let fixture: ComponentFixture<DqSphereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DqSphereComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqSphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
