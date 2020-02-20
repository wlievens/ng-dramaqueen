import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DqGridComponent} from './dq-grid.component';

describe('DqGridComponent', () => {
  let component: DqGridComponent;
  let fixture: ComponentFixture<DqGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DqGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
