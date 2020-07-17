import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { ViewerService } from '../../../services/viewer.service';

@Component({
  selector: 'dwdropdown',
  templateUrl: './dwdropdown.component.html',
  styleUrls: ['./dwdropdown.component.scss']
})
export class DwdropdownComponent extends FieldType implements OnInit {

  fieldOptions: any;

  constructor(private vs: ViewerService) {
    super();
  }

  get type() {
    return this.to.type || 'text';
  }

  ngOnInit() { 
    this.fieldOptions = this.field.templateOptions.originalFieldOptions;

    if(this.vs.getMode() == "preview" || this.vs.isNewMode()){
      this.formControl.setValue(this.field.templateOptions.originalFieldOptions.defaultValue);
    }
  }

  getOptions() {
    return this.field.templateOptions.originalFieldOptions.options ? Object.keys(this.field.templateOptions.originalFieldOptions.options): [];
  }
}
