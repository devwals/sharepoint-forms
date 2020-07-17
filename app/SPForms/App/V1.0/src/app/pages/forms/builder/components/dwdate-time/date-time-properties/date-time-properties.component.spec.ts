import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimePropertiesComponent } from './date-time-properties.component';

describe('DateTimePropertiesComponent', () => {
  let component: DateTimePropertiesComponent;
  let fixture: ComponentFixture<DateTimePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
