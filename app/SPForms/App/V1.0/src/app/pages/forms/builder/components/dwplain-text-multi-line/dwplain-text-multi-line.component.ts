import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IComponent} from '../iComponent.builder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';

@Component({
  selector: 'dwplain-text-multi-line',
  templateUrl: './dwplain-text-multi-line.component.html',
  styleUrls: ['./dwplain-text-multi-line.component.scss']
})
export class DWPlainTextMultiLineComponent implements OnInit, IComponent {
  static type = "textfieldmulti";

  @Input() model: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();

  schema:any = {
    validation: ["required"],
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
    if(!this.model.richtext) {
      this.model.richtext = false;
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
    activeModal.componentInstance.schema = this.schema;

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
