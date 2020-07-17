import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoPropertiesComponent } from './yes-no-properties.component';

describe('YesNoPropertiesComponent', () => {
  let component: YesNoPropertiesComponent;
  let fixture: ComponentFixture<YesNoPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesNoPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
