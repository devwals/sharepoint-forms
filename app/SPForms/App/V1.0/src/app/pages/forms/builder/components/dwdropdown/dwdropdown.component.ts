import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IComponent} from '../iComponent.builder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';

@Component({
  selector: 'dwdropdown',
  templateUrl: './dwdropdown.component.html',
  styleUrls: ['./dwdropdown.component.scss']
})
export class DWDropdownComponent implements OnInit, IComponent {
  static type = "dropdown";

  @Input() model: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();

  schema: any = {
    validation: ["required"],
    properties: ["id", "type", "label", "class", "displayLabel", "hiddenField", "disabled", "readOnly", "helpBlock", "tooltip", "placeholder"]
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if(!this.model.options) {
      this.model.options = {
        "option1" : "option1",
        "option2" : "option2"
      };
    }

    if(!this.model.defaultValue) {
      this.model.defaultValue = null;
    }

    if(!this.model.placeholder) {
      this.model.placeholder = "-- select an option --";
    }
    if(!this.model.validation) {
      this.model.validation = {
        required : false
      };
    }
    this.model.displayLabel = true;
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
      if(obj) {
        this.editRequest.emit(this.model);
      }
    });
  }

  log(e) {
    this.logRequest.emit(e);
  }

  getOptions() {
    return this.model.options ? Object.keys(this.model.options): [];
  }
}
