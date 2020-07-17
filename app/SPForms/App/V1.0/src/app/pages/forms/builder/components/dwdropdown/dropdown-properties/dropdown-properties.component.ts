import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dropdown-properties',
  templateUrl: './dropdown-properties.component.html',
  styleUrls: ['./dropdown-properties.component.scss']
})
export class DropdownPropertiesComponent implements OnInit {

  @Input() model: any;
  
  constructor() { }

  ngOnInit() { }

  addOption(input) {
    console.log("added option : ", input);
    console.log("options : ", this.model.options);

    return this.model.options[input] = input;
  }

  getOptions(){
    return this.model.options ? Object.keys(this.model.options): [];
  }

  deleteRow(option){ 
    delete this.model.options[option];
    console.log("delete row");
  }

  selectRow(option) {
    console.log("default value : ", option);
    this.model.defaultValue = option;
  }

  removeDefaultValue(option) {
    this.model.defaultValue = null;
  }
}
