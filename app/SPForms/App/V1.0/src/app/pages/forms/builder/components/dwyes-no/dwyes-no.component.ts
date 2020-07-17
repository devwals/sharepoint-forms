import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IComponent} from '../iComponent.builder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';


@Component({
  selector: 'dwyes-no',
  templateUrl: './dwyes-no.component.html',
  styleUrls: ['./dwyes-no.component.scss']
})
export class DWYesNoComponent implements OnInit, IComponent {
  static type = "yesno";
  id = "";

  // yesnoOptions = [
  //   {value: true, label: "Yes"},
  //   {value: false, label: "No"}
  // ];

  @Input() model: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();

  schema: any = {
    validation: ["required"],
    properties: ["id", "type", "label", "class", "displayLabel", "hiddenField", "disabled", "readOnly", "helpBlock", "tooltip"]
  }
  
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.makeid();    
    if(!this.model.displayLabel) {
      this.model.displayLabel = true;
    }

    if(!this.model.properties) {
      this.model.properties = {
       displayType: "switch rounded"
      };
    }

    if(!this.model.options) {
      this.model.options =  [
        {value: true, label: "Yes"},
        {value: false, label: "No"}
      ]
    }

    if(!this.model.defaultValue) {
      this.model.defaultValue = true;
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

  //TODO : pass actual object id instead
  makeid() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      this.id += possible.charAt(Math.floor(Math.random() * possible.length));
    
    console.log("id : ", this.id);
    return this.id;
  }
}
