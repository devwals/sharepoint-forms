import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwimageComponent } from './dwimage.component';

describe('DwimageComponent', () => {
  let component: DwimageComponent;
  let fixture: ComponentFixture<DwimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
