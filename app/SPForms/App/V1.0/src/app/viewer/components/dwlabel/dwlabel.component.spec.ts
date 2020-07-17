import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwlabelComponent } from './dwlabel.component';

describe('DwlabelComponent', () => {
  let component: DwlabelComponent;
  let fixture: ComponentFixture<DwlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwlabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
