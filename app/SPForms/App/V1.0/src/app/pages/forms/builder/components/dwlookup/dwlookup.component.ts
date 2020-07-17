import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IComponent} from '../iComponent.builder';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';

@Component({
  selector: 'dwlookup',
  templateUrl: './dwlookup.component.html',
  styleUrls: ['./dwlookup.component.scss']
})
export class DwlookupComponent implements OnInit, IComponent {
  static type = "lookup";

  schema:any ={
    validation: ["required"],
    properties: ["id", "type", "label", "class", "displayLabel", "hiddenField", "disabled", "readOnly", "helpBlock", "tooltip", "placeholder"]
  }

  @Input() model: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();

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

  delete(){
    this.deleteRequest.emit(this.model);
  }

  edit(){
    const activeModal = this.modalService.open(ElementPropertiesComponent,
      { size: 'lg', container: 'nb-layout', backdrop: 'static' }
    );
    
    activeModal.componentInstance.view.elementItem = this.model;
    activeModal.componentInstance.listData = this.listData;
    activeModal.componentInstance.schema = this.schema

    activeModal.result.then((obj) => {
      if(obj) {
        this.editRequest.emit(this.model);
      }
    });
  }

  log(e){
    this.logRequest.emit(e);
  }
}
