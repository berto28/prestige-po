import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewScrapComponent } from './modal-view-scrap.component';

describe('ModalViewScrapComponent', () => {
  let component: ModalViewScrapComponent;
  let fixture: ComponentFixture<ModalViewScrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalViewScrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewScrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
