import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import * as moment from 'moment';
import { ViewerService } from '../../../services/viewer.service';

@Component({
  selector: 'dwvdate-picker',
  templateUrl: './dwvdate-picker.component.html',
  styleUrls: ['./dwvdate-picker.component.scss'],
  host: {
    '[class.d-inline-flex]': 'to.addonLeft || to.addonRight',
    '[class.custom-file]': 'to.addonLeft || to.addonRight',
  }
})
export class DWVDatePickerComponent extends FieldType implements OnInit {

  fieldOptions: any;

  constructor(private vs: ViewerService) {
    super();
  }
  
  get type() {
    return this.to.type || 'text';
  }
  
  ngOnInit() { 
    if(this.vs.getMode() == "preview" || this.vs.isNewMode()){
      this.formControl.setValue(this.field.templateOptions.originalFieldOptions.defaultValue);
    }
    else if(this.formControl.value) {
      this.formControl.setValue(
        moment((this.formControl.value)).format('YYYY-MM-DD')
      );
    }
  }
}
