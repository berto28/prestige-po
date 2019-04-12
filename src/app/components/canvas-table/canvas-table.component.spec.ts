import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasTableComponent } from './canvas-table.component';

describe('CanvasTableComponent', () => {
  let component: CanvasTableComponent;
  let fixture: ComponentFixture<CanvasTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
