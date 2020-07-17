import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IComponent} from '../iComponent.builder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';

@Component({
  selector: 'dwvertical-line',
  templateUrl: './dwvertical-line.component.html',
  styleUrls: ['./dwvertical-line.component.scss']
})
export class DWVerticalLineComponent implements OnInit, IComponent {
  static type = "verticalline";

  @Input() model: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();

  schema: any = {
    validation: [],
    properties: ["id", "type", "class"]
  };
  
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if(!this.model.properties) {
      this.model.properties = {
        align : "50%",
        height : 250,
        width: 1,
        color : "#333",
        heightUnit: "px",
        widthUnit: "px"
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
