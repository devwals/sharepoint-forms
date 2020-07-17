import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLookupPropertiesComponent } from './list-lookup-properties.component';

describe('ListLookupPropertiesComponent', () => {
  let component: ListLookupPropertiesComponent;
  let fixture: ComponentFixture<ListLookupPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLookupPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLookupPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
