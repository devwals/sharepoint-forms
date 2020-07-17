import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwverticalLineComponent } from './dwvertical-line.component';

describe('DwverticalLineComponent', () => {
  let component: DwverticalLineComponent;
  let fixture: ComponentFixture<DwverticalLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwverticalLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwverticalLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
