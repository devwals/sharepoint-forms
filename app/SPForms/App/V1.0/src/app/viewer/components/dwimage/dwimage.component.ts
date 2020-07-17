import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'dwimage',
  templateUrl: './dwimage.component.html',
  styleUrls: ['./dwimage.component.scss']
})
export class DwimageComponent extends FieldType implements OnInit {

  fieldOptions: any;

  get type() {
    return this.to.type || 'text';
  }
  
  ngOnInit() { 
    this.fieldOptions = this.field.templateOptions.originalFieldOptions;
  }

}
