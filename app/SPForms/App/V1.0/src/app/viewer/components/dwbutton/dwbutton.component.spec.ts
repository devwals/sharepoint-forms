import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwbuttonComponent } from './dwbutton.component';

describe('DwbuttonComponent', () => {
  let component: DwbuttonComponent;
  let fixture: ComponentFixture<DwbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
