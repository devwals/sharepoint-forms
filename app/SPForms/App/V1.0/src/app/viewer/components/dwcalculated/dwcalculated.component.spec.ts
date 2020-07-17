import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwcalculatedComponent } from './dwcalculated.component';

describe('DwcalculatedComponent', () => {
  let component: DwcalculatedComponent;
  let fixture: ComponentFixture<DwcalculatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwcalculatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwcalculatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
