import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DqGroupComponent } from './dq-group.component';

describe('DqGroupComponent', () => {
  let component: DqGroupComponent;
  let fixture: ComponentFixture<DqGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DqGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
