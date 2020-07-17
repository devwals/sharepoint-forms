import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { ViewerService } from '../../../services/viewer.service';

@Component({
  selector: 'dwyes-no',
  templateUrl: './dwyes-no.component.html',
  styleUrls: ['./dwyes-no.component.scss']
})
export class DwyesNoComponent extends FieldType implements OnInit {

  fieldOptions: any;

  get type() {
    return this.to.type || 'text';
  }

  constructor(private vs: ViewerService) {
    super();
  }

  ngOnInit() {
    this.fieldOptions = this.field.templateOptions.originalFieldOptions;

    if(this.vs.getMode() == "preview" || this.vs.isNewMode()){

      let defaultValue = this.field.templateOptions.originalFieldOptions.defaultValue ? true : false;
      this.formControl.setValue(defaultValue);

      console.log("display type : ", this.fieldOptions.properties.displayType);
    }
  }
}
