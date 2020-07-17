import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { ViewerService } from '../../../services/viewer.service';

@Component({
  selector: 'dwmulticheckbox',
  templateUrl: './dwmulticheckbox.component.html',
  styleUrls: ['./dwmulticheckbox.component.scss']
})
export class DwMultiCheckboxComponent extends FieldType {

  defaultValue = "";
  fieldOptions: any;

  constructor(private vs: ViewerService) {
    super();
  }

  ngOnInit() {
    this.fieldOptions = this.field.templateOptions.originalFieldOptions;
    if(this.vs.getMode() == "preview" || this.vs.isNewMode()){
      let defaultValue = this.field.templateOptions.originalFieldOptions.defaultValue ? [this.field.templateOptions.originalFieldOptions.defaultValue] : [];
      this.formControl.setValue(defaultValue);
    }
  }

  optionExists(option)
  {
    return (this.formControl.value.indexOf(option) > -1);
  }

  onChange(value, checked) {
    this.formControl.markAsTouched();
    if (this.field.templateOptions.originalFieldOptions.sptype == "multichoice") {
      let values = this.model[this.field.templateOptions.originalFieldOptions.listId + '#'+ this.field.templateOptions.originalFieldOptions.field] || [];
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
