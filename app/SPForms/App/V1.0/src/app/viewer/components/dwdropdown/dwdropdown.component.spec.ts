import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwdropdownComponent } from './dwdropdown.component';

describe('DwdropdownComponent', () => {
  let component: DwdropdownComponent;
  let fixture: ComponentFixture<DwdropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwdropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
