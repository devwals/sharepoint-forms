import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalLinePropertiesComponent } from './horizontal-line-properties.component';

describe('HorizontalLinePropertiesComponent', () => {
  let component: HorizontalLinePropertiesComponent;
  let fixture: ComponentFixture<HorizontalLinePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalLinePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalLinePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
