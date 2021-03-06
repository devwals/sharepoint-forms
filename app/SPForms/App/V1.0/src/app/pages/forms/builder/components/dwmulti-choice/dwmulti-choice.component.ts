import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IComponent} from '../iComponent.builder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';


@Component({
  selector: 'dwmulti-choice',
  templateUrl: './dwmulti-choice.component.html',
  styleUrls: ['./dwmulti-choice.component.scss']
})
export class DWMultiChoiceComponent implements OnInit, IComponent {
  static type = "choice";
  id = "";

  schema: any = {
    validation: ["required"],
    properties: ["id", "type", "label", "class", "displayLabel", "hiddenField", "disabled", "readOnly", "helpBlock", "tooltip", "placeholder"]
  };

  @Input() model: any;  
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();

  constructor(private modalService: NgbModal) { };

  ngOnInit() {
    if(!this.model.options && !this.model.defaultValue) {
      this.model.options = [
        {label: "option1", value: "option1"},
        {label: "option2", value: "option2"}
      ]
    }

    if(this.model.defaultValue && !this.model.options ) {
      this.model.options = [
        {label: this.model.defaultValue, value: this.model.defaultValue}
      ]
    }

    if(!this.model.displayType) {
      this.model.displayType = "Checkbox";
    }

    if(!this.model.defaultValue) {
      this.model.defaultValue = null;
    }
    
    if(!this.model.displayLabel) {
      this.model.displayLabel = true;
    }

    if(!this.model.placeholder) {
      this.model.placeholder = "--select an option--"
    }
    
    if(!this.model.validation) {
      this.model.validation = {
        required : false
      };
    }

    this.makeid();
    // console.log(this.getChoicesValues());
    console.log("options :", this.model.options);
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
        // this.model = obj;
        this.editRequest.emit(this.model);
      }
    });
  }

  log(e){
    this.logRequest.emit(e);
  }

  // getChoices() {
  //   return this.model.choices ? Object.keys(this.model.choices): [];
  // }

  getChoicesValues() {
    return this.model.options ? Object.values(this.model.options): [];
  }

  //TODO : pass actual object id instead
  makeid() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      this.id += possible.charAt(Math.floor(Math.random() * possible.length));
    
    // console.log("id : ", this.id);
    return this.id;
  }
}
