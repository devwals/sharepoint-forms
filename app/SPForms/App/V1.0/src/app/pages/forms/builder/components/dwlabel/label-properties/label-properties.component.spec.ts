import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelPropertiesComponent } from './label-properties.component';

describe('LabelPropertiesComponent', () => {
  let component: LabelPropertiesComponent;
  let fixture: ComponentFixture<LabelPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
