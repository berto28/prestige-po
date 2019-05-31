import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierSectionTypeComponent } from './supplier-section-type.component';

describe('SupplierSectionTypeComponent', () => {
  let component: SupplierSectionTypeComponent;
  let fixture: ComponentFixture<SupplierSectionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierSectionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierSectionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
