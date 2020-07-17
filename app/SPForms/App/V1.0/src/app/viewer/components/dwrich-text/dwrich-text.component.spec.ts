import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwrichTextComponent } from './dwrich-text.component';

describe('DwrichTextComponent', () => {
  let component: DwrichTextComponent;
  let fixture: ComponentFixture<DwrichTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwrichTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwrichTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
