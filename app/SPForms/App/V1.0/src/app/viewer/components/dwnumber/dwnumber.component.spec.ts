import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwnumberComponent } from './dwnumber.component';

describe('DwnumberComponent', () => {
  let component: DwnumberComponent;
  let fixture: ComponentFixture<DwnumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwnumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
