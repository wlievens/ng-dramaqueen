import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DqSceneComponent} from './dq-scene.component';

describe('DqSceneComponent', () => {
  let component: DqSceneComponent;
  let fixture: ComponentFixture<DqSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DqSceneComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
