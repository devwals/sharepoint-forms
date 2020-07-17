import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwcolumnsComponent } from './dwcolumns.component';

describe('DwcolumnsComponent', () => {
  let component: DwcolumnsComponent;
  let fixture: ComponentFixture<DwcolumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwcolumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwcolumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
