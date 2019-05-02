import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCuttingListComponent } from './modal-cutting-list.component';

describe('ModalCuttingListComponent', () => {
  let component: ModalCuttingListComponent;
  let fixture: ComponentFixture<ModalCuttingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCuttingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCuttingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
