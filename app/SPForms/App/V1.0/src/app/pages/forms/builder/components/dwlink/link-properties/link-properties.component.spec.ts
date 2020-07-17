import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkPropertiesComponent } from './link-properties.component';

describe('LinkPropertiesComponent', () => {
  let component: LinkPropertiesComponent;
  let fixture: ComponentFixture<LinkPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
