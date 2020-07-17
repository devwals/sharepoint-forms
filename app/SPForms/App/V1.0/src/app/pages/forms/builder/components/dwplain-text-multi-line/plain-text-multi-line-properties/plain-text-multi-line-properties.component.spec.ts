import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainTextMultiLinePropertiesComponent } from './plain-text-multi-line-properties.component';

describe('PlainTextMultiLinePropertiesComponent', () => {
  let component: PlainTextMultiLinePropertiesComponent;
  let fixture: ComponentFixture<PlainTextMultiLinePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlainTextMultiLinePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainTextMultiLinePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
