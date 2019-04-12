import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddPoComponent } from './modal-add-po.component';

describe('ModalAddPoComponent', () => {
  let component: ModalAddPoComponent;
  let fixture: ComponentFixture<ModalAddPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
