import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwdateTimeComponent } from './dwdate-time.component';

describe('DwdateTimeComponent', () => {
  let component: DwdateTimeComponent;
  let fixture: ComponentFixture<DwdateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwdateTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwdateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
