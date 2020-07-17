import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'dwhorizontal-line',
  templateUrl: './dwhorizontal-line.component.html',
  styleUrls: ['./dwhorizontal-line.component.scss']
})
export class DwhorizontalLineComponent extends FieldType implements OnInit {

  get type() {
    return this.to.type || 'text';
  }
  
  ngOnInit() { 
    this.model = this.field.templateOptions.originalFieldOptions;
  }

}
