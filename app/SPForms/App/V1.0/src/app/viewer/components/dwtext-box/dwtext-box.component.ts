import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { ViewerService } from '../../../services/viewer.service';

@Component({
  selector: 'dwtext-box',
  templateUrl: './dwtext-box.component.html',
  styleUrls: ['./dwtext-box.component.scss'],
  host: {
    '[class.d-inline-flex]': 'to.addonLeft || to.addonRight',
    '[class.custom-file]': 'to.addonLeft || to.addonRight',
  }
})
export class DwtextBoxComponent extends FieldType implements OnInit {

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


    // this.field.formControl.valueChanges.subscribe(v=>{
    //   this.vs.executeConditionalLogic();
    // })

  }
}
