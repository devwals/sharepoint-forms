import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { SPFormService } from '../../services/sp-form.service';
import { SPFormlyService } from '../../services/sp-formly.service';
import { ViewerService } from '../../services/viewer.service';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [];
  model: any = {};
  item: any;
  loading = true;

  constructor(
    private activeModal: NgbActiveModal,
    private fs: SPFormService,
    private toastr: ToastrService,
    private formlyService: SPFormlyService,
    private vs: ViewerService
  ) { }

  ngOnInit() {
    this.vs.setMode("preview");

    if(!this.item.Id) {
      this.fields = this.formlyService.getFormlySchema(this.item);
      this.loading = false;
    } else {
      this.getForm();
    }

    console.log("form : ", this.form);
  }

  getForm() {
    this.fs.getFormById(this.item.Id).then((res) => {
      this.fields = this.formlyService.getFormlySchema(res["file"].components);
      console.log("formly schema fields : ", this.fields);
      this.loading = false;
    }, (e) => {
      this.toastr.error(e, 'Error', { closeButton: true });
      console.log("Forms Error Response: {0}", JSON.stringify(e, null, 4));
      this.loading = false;
    });
  }

  cancel() {
    this.activeModal.close();
  }
}
