import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwplainTextMultiLineComponent } from './dwplain-text-multi-line.component';

describe('DwplainTextMultiLineComponent', () => {
  let component: DwplainTextMultiLineComponent;
  let fixture: ComponentFixture<DwplainTextMultiLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwplainTextMultiLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwplainTextMultiLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
