import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasAddComponent } from './canvas-add.component';

describe('CanvasAddComponent', () => {
  let component: CanvasAddComponent;
  let fixture: ComponentFixture<CanvasAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
