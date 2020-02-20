import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DqModelComponent} from './dq-model.component';

describe('DqModelComponent', () => {
  let component: DqModelComponent;
  let fixture: ComponentFixture<DqModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DqModelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
