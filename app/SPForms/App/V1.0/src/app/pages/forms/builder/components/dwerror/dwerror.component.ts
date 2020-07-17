import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IComponent } from '../iComponent.builder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';

@Component({
  selector: 'dwerror',
  templateUrl: './dwerror.component.html',
  styleUrls: ['./dwerror.component.scss']
})
export class DWErrorComponent implements OnInit, IComponent {
  static type = "error";
  
  @Input() model: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();

  schema:any ={
    validation: [],
    properties: []
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
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
  }

  log(e){
    this.logRequest.emit(e);
  }

}
