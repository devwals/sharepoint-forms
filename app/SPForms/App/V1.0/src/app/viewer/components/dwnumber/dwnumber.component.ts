import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { ViewerService } from '../../../services/viewer.service';

@Component({
  selector: 'dwnumber',
  templateUrl: './dwnumber.component.html',
  styleUrls: ['./dwnumber.component.scss']
})
export class DwnumberComponent extends FieldType implements OnInit {

  constructor(private vs: ViewerService) {
    super();
  }

  get type() {
    return this.to.type || 'text';
  }

  ngOnInit() {
    // if(this.vs.getMode() == "preview" || this.vs.isNewMode()){
    //   this.formControl.setValue(this.field.templateOptions.originalFieldOptions.defaultValue);
    // }
  }
}
