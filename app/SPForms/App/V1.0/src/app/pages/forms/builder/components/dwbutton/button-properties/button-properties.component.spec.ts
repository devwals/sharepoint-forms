import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPropertiesComponent } from './button-properties.component';

describe('ButtonPropertiesComponent', () => {
  let component: ButtonPropertiesComponent;
  let fixture: ComponentFixture<ButtonPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
