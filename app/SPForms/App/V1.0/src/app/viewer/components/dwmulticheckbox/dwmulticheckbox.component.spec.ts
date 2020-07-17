import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwmulticheckboxComponent } from './dwmulticheckbox.component';

describe('DwmulticheckboxComponent', () => {
  let component: DwmulticheckboxComponent;
  let fixture: ComponentFixture<DwmulticheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwmulticheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwmulticheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
