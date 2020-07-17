import { ViewerService } from './../../../services/viewer.service';
import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { SPFormlyService } from '../../../services/sp-formly.service';

@Component({
  selector: 'dwtabs',
  templateUrl: './dwtabs.component.html',
  styleUrls: ['./dwtabs.component.scss']
})
export class DwtabsComponent extends FieldType implements OnInit {

  model: any = {};
  tabForms = [];
  fields: any[] = [];

  constructor(
    private formlyService: SPFormlyService,
    private vs: ViewerService
  ) {
    super();
  }

  get type() {
    return this.to.type || 'text';
  }

  ngOnInit() {
    this.fields = this.getFormlySchema(this.field.templateOptions.originalFieldOptions.children)
    for(let index = 0; index < this.fields.length; index++) {
      let tab = new FormGroup({});
      this.tabForms.push(tab);
      this.vs.addForm(tab);
    }
  }

  getFormlySchema(form: any[]) {
    let tempFields: any[] = [];
    
    for (let index = 0; index < form.length; index++) {
      let element = form[index];
      tempFields.push({
        label: element.label,
        fields: this.formlyService.getFormlySchema(
                this.field.templateOptions.originalFieldOptions.children[index].children
                ),
        active : index == 0 ? true : false
      });
    }
    console.log("temp fields : ", tempFields);
    return tempFields;
  }
}
