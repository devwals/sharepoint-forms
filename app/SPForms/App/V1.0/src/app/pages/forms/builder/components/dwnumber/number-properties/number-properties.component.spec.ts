import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPropertiesComponent } from './number-properties.component';

describe('NumberPropertiesComponent', () => {
  let component: NumberPropertiesComponent;
  let fixture: ComponentFixture<NumberPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
