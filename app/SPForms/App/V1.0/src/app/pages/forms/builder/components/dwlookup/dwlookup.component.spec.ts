import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwlookupComponent } from './dwlookup.component';

describe('DwlookupComponent', () => {
  let component: DwlookupComponent;
  let fixture: ComponentFixture<DwlookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwlookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwlookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
