import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-delete-form',
  templateUrl: './modal-delete-form.component.html',
  styleUrls: ['./modal-delete-form.component.scss']
})
export class ModalDeleteFormComponent {

  modalHeader: string;
  modalContent: string;

  constructor(private activeModal: NgbActiveModal) { }
}
