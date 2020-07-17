import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabItemPropertiesComponent } from './tab-item-properties.component';

describe('TabItemPropertiesComponent', () => {
  let component: TabItemPropertiesComponent;
  let fixture: ComponentFixture<TabItemPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabItemPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabItemPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
