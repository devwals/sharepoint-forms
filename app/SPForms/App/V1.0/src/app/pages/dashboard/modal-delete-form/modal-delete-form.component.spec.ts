import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteFormComponent } from './modal-delete-form.component';

describe('ModalDeleteFormComponent', () => {
  let component: ModalDeleteFormComponent;
  let fixture: ComponentFixture<ModalDeleteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
