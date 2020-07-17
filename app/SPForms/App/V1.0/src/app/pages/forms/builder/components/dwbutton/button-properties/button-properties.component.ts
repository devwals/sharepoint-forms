import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'button-properties',
  templateUrl: './button-properties.component.html',
  styleUrls: ['./button-properties.component.scss']
})
export class ButtonPropertiesComponent implements OnInit {

  @Input() model: any;
  
  constructor() { }

  ngOnInit() {
  }

  onChange(value) {
    console.log(value);

    if(value == "save") {
      this.model.buttonType = "save";
      this.model.label = "save";
    } else if (value == "print") {
      this.model.buttonType = "print";
      this.model.label = "print";
    } else {
      this.model.buttonType = "back";
      this.model.label = "back";
    }
  }
}
