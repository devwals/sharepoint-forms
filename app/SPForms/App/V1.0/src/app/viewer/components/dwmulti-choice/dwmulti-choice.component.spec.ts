import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwmultiChoiceComponent } from './dwmulti-choice.component';

describe('DwmultiChoiceComponent', () => {
  let component: DwmultiChoiceComponent;
  let fixture: ComponentFixture<DwmultiChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwmultiChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwmultiChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
