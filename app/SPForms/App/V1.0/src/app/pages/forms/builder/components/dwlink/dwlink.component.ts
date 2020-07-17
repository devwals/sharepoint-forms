import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';

@Component({
  selector: 'dwlink',
  templateUrl: './dwlink.component.html',
  styleUrls: ['./dwlink.component.scss']
})
export class DwlinkComponent implements OnInit {

  static type = "link";

  @Input() model: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();
  
  schema: any = {
    validation: ["required"],
    properties: ["id", "type", "label", "class", "tooltip"]
  }

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.model.displayLabel = true;

    if(!this.model.url) {
      this.model.url = "";
    }

    if(!this.model.targetType) {
      this.model.targetType = "_blank";
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
