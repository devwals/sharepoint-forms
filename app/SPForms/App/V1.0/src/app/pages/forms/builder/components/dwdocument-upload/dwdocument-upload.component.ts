import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IComponent} from '../iComponent.builder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';

@Component({
  selector: 'dwdocument-upload',
  templateUrl: './dwdocument-upload.component.html',
  styleUrls: ['./dwdocument-upload.component.scss']
})
export class DWDocumentUploadComponent implements OnInit, IComponent {
  static type = "document";

  @Input() model: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();
  
  schema: any = {
    validation: ["required"],
    properties: ["id", "type", "label", "class", "displayLabel", "hiddenField", "disabled", "readOnly", "helpBlock", "tooltip"]
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() { 
    if(Object.keys(this.model).indexOf("validation") == -1){
      this.model.validation = {
        required:  true
      };
    }
    if(Object.keys(this.model).indexOf("displayLabel") == -1){
      this.model.displayLabel = true;
    }
    if(Object.keys(this.model).indexOf("disabled") == -1){
      this.model.disabled = true;
    }
    if(Object.keys(this.model).indexOf("listId") == -1){
      this.model.listId = this.listData.id;
      this.model.listName = this.listData.name;
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
      if (obj) {
        this.editRequest.emit(this.model);
      }
    });
  }

  log(e){
    this.logRequest.emit(e);
  }
}
