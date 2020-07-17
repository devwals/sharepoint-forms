import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { ViewerService } from '../../../services/viewer.service';

@Component({
  selector: 'dwplain-text-multi-line',
  templateUrl: './dwplain-text-multi-line.component.html',
  styleUrls: ['./dwplain-text-multi-line.component.scss']
})
export class DwplainTextMultiLineComponent extends FieldType implements OnInit {

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
  }
}
