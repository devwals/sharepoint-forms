import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'dwvertical-line',
  templateUrl: './dwvertical-line.component.html',
  styleUrls: ['./dwvertical-line.component.scss']
})
export class DwverticalLineComponent extends FieldType implements OnInit {

  get type() {
    return this.to.type || 'text';
  }
  
  ngOnInit() { 
    this.model = this.field.templateOptions.originalFieldOptions;
  }

}
