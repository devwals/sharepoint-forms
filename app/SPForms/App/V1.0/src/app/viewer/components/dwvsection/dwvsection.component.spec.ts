import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwvsectionComponent } from './dwvsection.component';

describe('DwvsectionComponent', () => {
  let component: DwvsectionComponent;
  let fixture: ComponentFixture<DwvsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwvsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwvsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
