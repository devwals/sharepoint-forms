import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SPFormService } from '../../../../../services/sp-form.service';

@Component({
  selector: 'form-properties',
  templateUrl: './form-properties.component.html',
  styleUrls: ['./form-properties.component.scss']
})
export class FormPropertiesComponent implements OnInit {
  view: any = {};

  constructor(private activeModal: NgbActiveModal,
              private fs: SPFormService,
              private toastr: ToastrService) { }

  ngOnInit() { console.log("test : ", this.view.item); }

  save() {
    this.fs.updateFormName(this.view.item.FileLeafRef, this.view.item.Id)
      .then((r) => {
        this.toastr.success('Form Updated successfully!', 'DONE!', { closeButton: true });
        console.log("Form Updated successfully!");
        this.activeModal.close();
      }, (e) => {
        let error: string = e.toString();

        if(error.indexOf("already exists.") >= 0) {
          this.toastr.error(`Form with the name ${this.view.formName} already exists.`, 'Error', {closeButton: true} );
        } else {
          this.toastr.error(`${error}`, 'Error', {closeButton: true} );
        }
      });
  }
}
  