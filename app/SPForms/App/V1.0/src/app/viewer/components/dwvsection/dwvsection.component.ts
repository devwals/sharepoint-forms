import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FieldType, FormlyFieldConfig, FormlyFormBuilder, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { SPFormlyService } from '../../../services/sp-formly.service';
import { ViewerService } from '../../../services/viewer.service';

@Component({
  selector: 'dwvsection',
  templateUrl: './dwvsection.component.html',
  styleUrls: ['./dwvsection.component.scss']
})
export class DwvsectionComponent extends FieldType implements OnInit {

  public fields: FormlyFieldConfig[] = [];
  form1 = new FormGroup({});
  description: any;
  loadForm: boolean = false;
  sectionForms = [];

  constructor(
    private formlyService: SPFormlyService,
    private vs: ViewerService
  ) {
    super();   
    this.vs.addForm(this.form1); 
  }

  get type() {
    return this.to.type || 'text';
  }

  ngOnInit() {
    setTimeout(() => {
      this.fields =
        this.formlyService.getFormlySchema(
          this.field.templateOptions.originalFieldOptions.children
        );
      this.loadForm = true;
    });
  }
}
