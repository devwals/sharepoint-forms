import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiChoicePropertiesComponent } from './multi-choice-properties.component';

describe('MultiChoicePropertiesComponent', () => {
  let component: MultiChoicePropertiesComponent;
  let fixture: ComponentFixture<MultiChoicePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiChoicePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiChoicePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
