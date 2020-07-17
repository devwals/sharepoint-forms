import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwlinkComponent } from './dwlink.component';

describe('DwlinkComponent', () => {
  let component: DwlinkComponent;
  let fixture: ComponentFixture<DwlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
