import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalLinePropertiesComponent } from './vertical-line-properties.component';

describe('VerticalLinePropertiesComponent', () => {
  let component: VerticalLinePropertiesComponent;
  let fixture: ComponentFixture<VerticalLinePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalLinePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalLinePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
