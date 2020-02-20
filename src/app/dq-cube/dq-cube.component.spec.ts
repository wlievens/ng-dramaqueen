import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DqCubeComponent } from './dq-cube.component';

describe('DqCubeComponent', () => {
  let component: DqCubeComponent;
  let fixture: ComponentFixture<DqCubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DqCubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
