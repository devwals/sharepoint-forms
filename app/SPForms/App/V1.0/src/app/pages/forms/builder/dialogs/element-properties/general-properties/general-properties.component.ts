import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'general-properties',
  templateUrl: './general-properties.component.html',
  styleUrls: ['./general-properties.component.scss']
})
export class GeneralPropertiesComponent implements OnInit {

  @Input() model: any;
  @Input() itemProperties: any [];

  data = [
    {value: true, label: "Yes"},
    {value: false, label: "No"}
  ]
  constructor() { }

  ngOnInit() {
    console.log("model : ", this.model);
    if(!this.model.hiddenField) {
      this.model.hiddenField = false;
    }
    if(!this.model.readOnly) {
      this.model.readOnly = false;
    }
    if(!this.model.disabled) {
      this.model.disabled = false;
    }
    if(!this.model.helpBlock) {
      this.model.helpBlock = "";
    }
    if(!this.model.tooltip ) {
      this.model.tooltip = "";
    }
    if(!this.model.placeholder) {
      this.model.placeholder = "";
    }
  }

  toggleDisplayLabel(){
    this.model.displayLabel = !this.model.displayLabel;
    console.log("toggle");
  }
}
