import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IComponent } from '../iComponent.builder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';

@Component({
  selector: 'dw-calculated',
  templateUrl: './dwcalculated.component.html',
  styleUrls: ['./dwcalculated.component.scss']
})
export class DWCalculatedComponent  implements OnInit, IComponent {
  static type = "calculated";

  @Input() model: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();

  schema: any = {
    validation: ["required", "regular expression"],
    properties: ["id", "type", "label", "class", "displayLabel", "hiddenField", "disabled", "readOnly", "helpBlock", "tooltip", "placeholder"]
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if(!this.model.displayLabel) {
      this.model.displayLabel = true;
    }
    if(!this.model.placeholder) {
      this.model.placeholder = "";
    }
    if(!this.model.validation) {
      this.model.validation = {
        required : false
      };
    }
  }

  delete() {
    this.deleteRequest.emit(this.model);
  }

  edit() {
    const activeModal = this.modalService.open(ElementPropertiesComponent,
      { size: 'lg', container: 'nb-layout', backdrop: 'static' }
    );

    activeModal.componentInstance.view.elementItem = this.model;
    activeModal.componentInstance.listData = this.listData;
    activeModal.componentInstance.schema = this.schema;

    activeModal.result.then((obj) => {
      if (obj) {
        this.editRequest.emit(this.model);
      }
    });
  }

  log(e) {
    this.logRequest.emit(e);
  }
}