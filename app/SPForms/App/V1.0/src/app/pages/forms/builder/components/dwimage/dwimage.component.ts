import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IComponent} from '../iComponent.builder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';

@Component({
  selector: 'dwimage',
  templateUrl: './dwimage.component.html',
  styleUrls: ['./dwimage.component.scss']
})
export class DWImageComponent implements OnInit, IComponent {
  static type = "image";

  schema: any = {
    validation: [],
    properties: ["id", "type", "class"]
  };
  
  @Input() model: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();
  
  constructor(private modalService: NgbModal) { }

  ngOnInit() { 
    if(!this.model.height) {
      this.model.height = "100";
    }

    if(!this.model.width) {
      this.model.width = "100";
    }

    if(!this.model.imageUrl) {
      // this.model.imageUrl = "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?cs=srgb&dl=beauty-bloom-blue-67636.jpg&fm=jpg";
      this.model.imageUrl = "";
    }

    if(!this.model.alignment) {
      this.model.alignment = "left";
    }

    if(!this.model.percentage) {
      this.model.percentage = false;
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
