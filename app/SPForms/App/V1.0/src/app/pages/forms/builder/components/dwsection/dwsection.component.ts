import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IComponent} from '../iComponent.builder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';

@Component({
  selector: 'dwsection',
  templateUrl: './dwsection.component.html',
  styleUrls: ['./dwsection.component.scss']
})
export class DWSectionComponent implements OnInit, IComponent {
  static type = "section";
  
  @Input() model: any;
  @Input() template: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();

  schema: any = {
    validation: [],
    properties: ["id", "type", "label", "class", "displayLabel"]
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if(!this.model.displayLabel) {
      this.model.displayLabel = true;
    }

    if(!this.model.description) {
      this.model.description = null;
    }
  }

  delete(item: any){
    this.deleteRequest.emit(item);
  }

  edit(item: any){
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
