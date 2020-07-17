import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SPDataService } from '../../../services/sp-data.service';
import { ToastrService } from 'ngx-toastr';
import { SPFormService } from '../../../services/sp-form.service';

@Component({
  selector: 'edit-list-form',
  templateUrl: './edit-list-form.component.html',
  styleUrls: ['./edit-list-form.component.scss']
})
export class EditListFormComponent implements OnInit {
  view: any = {
    forms: {
      contentTypes: []
    }
  };
  
  constructor(
    private activeModal: NgbActiveModal,
    private sps: SPDataService,
    private toastr: ToastrService,
    private fs: SPFormService
  ) { }

  ngOnInit() {
    this.setFormUrls();
    this.getContentTypeForms();

    console.log("edit lists : ", this.view.listForms);
  }

  setFormUrls() {
    for (let index = 0; index < this.view.listForms.length; index++) {
      let element = this.view.listForms[index];

      element.formUrl = this.fs.getFormUrl(element.Id, this.view.list.ParentWebUrl, "display");
      element.editFormUrl = this.fs.getFormUrl(element.Id, this.view.list.ParentWebUrl, "edit");
      element.newFormUrl = this.fs.getFormUrl(element.Id, this.view.list.ParentWebUrl, "new");

    }
  }

  getContentTypeForms() {
    let contentTypes = [];
    for (let index = 0; index < this.view.list.ContentTypes.length; index++) {
      const element = this.view.list.ContentTypes[index];
      if (!element.Sealed) {
        contentTypes.push(Object.assign({}, element));
      }
    }
    this.view.forms.contentTypes = contentTypes;
  }

  save() {
    let param: any = {
      data: {}
    };
    param.Id = this.view.list.Id;
    param.ContentTypes = this.view.forms.contentTypes;

    console.log("param : ", param);
    this.sps.saveListForms(param).then(r => {
      this.toastr.success('Form saved successfully!!!!', 'Saved',
        { closeButton: true });
      this.activeModal.close(true);
    }, e => {
      this.toastr.error('Save failed!', 'ERROR!',
        { closeButton: true });
      this.toastr.error(e, '',
        { closeButton: true });
    });
  }
}
