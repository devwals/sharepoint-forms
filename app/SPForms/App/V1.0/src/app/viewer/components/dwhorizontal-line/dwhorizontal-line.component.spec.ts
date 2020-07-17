import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwhorizontalLineComponent } from './dwhorizontal-line.component';

describe('DwhorizontalLineComponent', () => {
  let component: DwhorizontalLineComponent;
  let fixture: ComponentFixture<DwhorizontalLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwhorizontalLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwhorizontalLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
