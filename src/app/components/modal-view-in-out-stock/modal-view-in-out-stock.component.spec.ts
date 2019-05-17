import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewInOutStockComponent } from './modal-view-in-out-stock.component';

describe('ModalViewInOutStockComponent', () => {
  let component: ModalViewInOutStockComponent;
  let fixture: ComponentFixture<ModalViewInOutStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalViewInOutStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewInOutStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
