import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'dwlink',
  templateUrl: './dwlink.component.html',
  styleUrls: ['./dwlink.component.scss']
})
export class DwlinkComponent extends FieldType implements OnInit {

  get type() {
    return this.to.type || 'text';
  }
  
  ngOnInit() { 
    this.model = this.field.templateOptions.originalFieldOptions;
  }

}
