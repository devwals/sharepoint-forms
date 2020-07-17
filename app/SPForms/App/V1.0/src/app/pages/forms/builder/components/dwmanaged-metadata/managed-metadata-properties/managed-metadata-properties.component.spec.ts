import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedMetadataPropertiesComponent } from './managed-metadata-properties.component';

describe('ManagedMetadataPropertiesComponent', () => {
  let component: ManagedMetadataPropertiesComponent;
  let fixture: ComponentFixture<ManagedMetadataPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedMetadataPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedMetadataPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
