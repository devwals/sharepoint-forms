import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'dwlabel',
  templateUrl: './dwlabel.component.html',
  styleUrls: ['./dwlabel.component.scss']
})
export class DwlabelComponent extends FieldType implements OnInit {

  fieldOptions: any;

  get type() {
    return this.to.type || 'text';
  }
  
  ngOnInit() { 
    this.fieldOptions = this.field.templateOptions.originalFieldOptions;
  }
}
