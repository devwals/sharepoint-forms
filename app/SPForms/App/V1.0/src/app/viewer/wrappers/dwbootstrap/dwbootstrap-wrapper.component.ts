import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'dw-bootstrap-wrapper',
  templateUrl: './dwbootstrap-wrapper.component.html',
  styleUrls: ['./dwbootstrap-wrapper.component.scss']
})
export class DWBootstrapWrapperComponent extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}
