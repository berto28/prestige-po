import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddStockComponent } from './modal-add-stock.component';

describe('ModalAddStockComponent', () => {
  let component: ModalAddStockComponent;
  let fixture: ComponentFixture<ModalAddStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
