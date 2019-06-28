import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLaborComponent } from './modal-labor.component';

describe('ModalLaborComponent', () => {
  let component: ModalLaborComponent;
  let fixture: ComponentFixture<ModalLaborComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLaborComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLaborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
