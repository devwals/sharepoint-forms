import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import * as moment from 'moment';
import { ViewerService } from '../../../services/viewer.service';


@Component({
  selector: 'dwdate-time',
  templateUrl: './dwdate-time.component.html',
  styleUrls: ['./dwdate-time.component.scss']
})
export class DwdateTimeComponent extends FieldType implements OnInit {
  
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
        moment((this.formControl.value)).format('YYYY-MM-DDTHH:mm:ss')
      );
    }
  }
}
