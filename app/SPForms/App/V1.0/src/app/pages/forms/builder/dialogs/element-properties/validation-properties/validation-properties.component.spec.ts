import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationPropertiesComponent } from './validation-properties.component';

describe('ValidationPropertiesComponent', () => {
  let component: ValidationPropertiesComponent;
  let fixture: ComponentFixture<ValidationPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
