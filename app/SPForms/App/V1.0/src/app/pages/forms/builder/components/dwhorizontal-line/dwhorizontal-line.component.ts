import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { IComponent } from '../iComponent.builder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';

@Component({
  selector: 'dwhorizontal-line',
  templateUrl: './dwhorizontal-line.component.html',
  styleUrls: ['./dwhorizontal-line.component.scss']
})
export class DWHorizontalLineComponent implements OnInit, IComponent {
  static type = "horizontalline";
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
    if(!this.model.properties) {
      this.model.properties = {
        height : 1,
        color : "#333",
        width: 100,
        heightUnit: "px",
        widthUnit: "%",
        lineType: "solid"
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
      if(obj) {
        this.model = obj;
        console.log(obj);
      }
    });
  }

  log(e){
    this.logRequest.emit(e);
  }
}
