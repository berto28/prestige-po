import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioMaterialTypeComponent } from './radio-material-type.component';

describe('RadioMaterialTypeComponent', () => {
  let component: RadioMaterialTypeComponent;
  let fixture: ComponentFixture<RadioMaterialTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioMaterialTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioMaterialTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
