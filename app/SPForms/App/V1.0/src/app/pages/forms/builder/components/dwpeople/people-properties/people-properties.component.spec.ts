import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePropertiesComponent } from './people-properties.component';

describe('PeoplePropertiesComponent', () => {
  let component: PeoplePropertiesComponent;
  let fixture: ComponentFixture<PeoplePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeoplePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoplePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
