import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'dwcalculated',
  templateUrl: './dwcalculated.component.html',
  styleUrls: ['./dwcalculated.component.scss']
})
export class DwcalculatedComponent extends FieldType implements OnInit {

  get type() {
    return this.to.type || 'text';
  }

  ngOnInit() {
    this.model = this.field.templateOptions.originalFieldOptions;
  }
}
