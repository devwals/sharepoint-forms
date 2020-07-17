import { FieldType } from '@ngx-formly/core';
import { Component, OnInit } from '@angular/core';
import { ViewerService } from '../../../services/viewer.service';

@Component({
  selector: 'dwvmulti-choice',
  templateUrl: './dwmulti-choice.component.html',
  styleUrls: ['./dwmulti-choice.component.scss']
})
export class DwmultiChoiceComponent extends FieldType implements OnInit {

  fieldOptions: any;
  selectedValues: any;

  get type() {
    return this.to.type || 'text';
  }

  constructor(private vs: ViewerService) {
    super();
  }
  
  ngOnInit() {
    this.fieldOptions = this.field.templateOptions.originalFieldOptions;
    console.log("choice fields : ", this.field);
    console.log("model", this.model);
  }

  getChoices() {
    return this.fieldOptions.choices ? Object.values(this.fieldOptions.choices) : [];
  }

  getChecked(value) {
    //Make sure form is not a new form or in preview
    if(this.vs.getMode() == "preview" || this.vs.isNewMode()){
      return this.fieldOptions.defaultValue == value;
    } else {
      if (this.field.templateOptions.originalFieldOptions.sptype == "multichoice") {
        return (this.model[this.field.templateOptions.originalFieldOptions.field] 
        ? this.model[this.field.templateOptions.originalFieldOptions.field].indexOf(value) != -1
        : false);
      } else {
        return value == this.model[this.field.templateOptions.originalFieldOptions.field];
      }
    }
  }

  selectChoice(e, value) {
    if (this.field.templateOptions.originalFieldOptions.sptype == "multichoice") {
      let values = this.model[this.field.templateOptions.originalFieldOptions.field] || [];
      if (values.includes(value)) {
        values.splice(values.indexOf(value), 1);
      } else {
        values.push(value);
      }
      this.formControl.setValue(values);
      console.log("model", this.model);
    } else {
      this.formControl.setValue(value);
      console.log("model", this.model);
    }
  }
}
