import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IComponent} from '../iComponent.builder';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';


@Component({
  selector: 'dwbutton',
  templateUrl: './dwbutton.component.html',
  styleUrls: ['./dwbutton.component.scss']
})
export class DWButtonComponent implements OnInit, IComponent {
  static type = "button";

  @Input() model: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();
  
  schema: any = {
    validation: [],
    properties: ["id", "type", "label", "class", "disabled", "tooltip"]
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() { 
    if(!this.model.buttonType) {
      this.model.buttonType = "save";
      this.model.label = "Save";
    }

    if(!this.model.buttonClass) {
      this.model.buttonClass = "btn-primary";
    }

    if(!this.model.align) {
      this.model.align = "left";
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
        this.model = obj;
      }
    });
  }

  log(e){
    this.logRequest.emit(e);
  }
}
