import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnItemPropertiesComponent } from './column-item-properties.component';

describe('ColumnItemPropertiesComponent', () => {
  let component: ColumnItemPropertiesComponent;
  let fixture: ComponentFixture<ColumnItemPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnItemPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnItemPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
