import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPropertiesComponent } from './dropdown-properties.component';

describe('DropdownPropertiesComponent', () => {
  let component: DropdownPropertiesComponent;
  let fixture: ComponentFixture<DropdownPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
