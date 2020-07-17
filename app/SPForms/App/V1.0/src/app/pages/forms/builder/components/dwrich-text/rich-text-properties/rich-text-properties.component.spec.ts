import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextPropertiesComponent } from './rich-text-properties.component';

describe('RichTextPropertiesComponent', () => {
  let component: RichTextPropertiesComponent;
  let fixture: ComponentFixture<RichTextPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichTextPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
