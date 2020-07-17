import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'validation-properties',
  templateUrl: './validation-properties.component.html',
  styleUrls: ['./validation-properties.component.scss']
})
export class ValidationPropertiesComponent implements OnInit {

  @Input() model: any;
  @Input() validationTypes: any = [];

  selectedType: string;
  
  constructor() { }

  ngOnInit() {
    this.selectedType = this.validationTypes[0];
  }

  getValidationKeys(){
    return this.model.validation ? Object.keys(this.model.validation): [];
  }

  onTypeSelected() {
    // console.log(this.selectedType);
  }

  addValidator() {

    if(!this.model.validation) {
      this.model.validation = {};
    }

    switch(this.selectedType) {
      case "required": return this.model.validation["required"] = true;
      case "regular expression" : return this.model.validation["regular expression"] = "";
      default: return this.model.validation[this.selectedType.toLowerCase()] = "";
    }
  }

  deleteRow(key){ 
    delete this.model.validation[key];
  }
}
