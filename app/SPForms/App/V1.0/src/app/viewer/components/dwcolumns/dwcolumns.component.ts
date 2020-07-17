import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldType, FormlyFieldConfig, FormlyFormBuilder } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { SPFormlyService } from '../../../services/sp-formly.service';
import { ViewerService } from '../../../services/viewer.service';

@Component({
  selector: 'dwvcolumns',
  templateUrl: './dwcolumns.component.html',
  styleUrls: ['./dwcolumns.component.scss']
})
export class DwcolumnsComponent extends FieldType implements OnInit {
  
  model: any = {};
  // form = new FormGroup({});
  fields: any[] = [];
  columnForms = [];
  loadForm: boolean = false;
  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;

  constructor(
    private formlyService: SPFormlyService,
    private builder: FormlyFormBuilder,
    private vs: ViewerService
  ) {
    super();
  }

  get type() {
    return this.to.type || 'text';
  }

  ngOnInit() {
    this.fields = this.getFormlySchema(this.field.templateOptions.originalFieldOptions.children);
    // this.builder.buildForm(this.form,this.fields,this.model,{});
    for(let index = 0; index < this.fields.length; index++) {
      let column = new FormGroup({});
      this.columnForms.push(column);
      this.vs.addForm(column);
    }
    this.loadForm == true;
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
    return tempFields;
  }
}
