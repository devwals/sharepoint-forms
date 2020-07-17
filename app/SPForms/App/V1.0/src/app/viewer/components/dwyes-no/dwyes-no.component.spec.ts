import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwyesNoComponent } from './dwyes-no.component';

describe('DwyesNoComponent', () => {
  let component: DwyesNoComponent;
  let fixture: ComponentFixture<DwyesNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwyesNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwyesNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
