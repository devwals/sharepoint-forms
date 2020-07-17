import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'multi-choice-properties',
  templateUrl: './multi-choice-properties.component.html',
  styleUrls: ['./multi-choice-properties.component.scss']
})
export class MultiChoicePropertiesComponent implements OnInit {

  @Input() model: any;
  @Input() listData: any;
  displayMode: string;

  constructor() { }

  ngOnInit() { 
    console.log("model : ", this.model);
  }

  addChoice(input) {
    let obj = {label: input, value: input};
    return this.model.options.push(obj);
  }

  selectRow(option) {
    this.model.defaultValue = option.label;
  }

  removeDefaultValue() {
    this.model.defaultValue = null;
  }

  getChoicesValues(){
    return this.model.options ? Object.values(this.model.options): [];
  }

  deleteRow(index){ 
    // delete this.model.options[index];
    this.model.options.splice(index, 1);
    console.log("delete row index", index);
  }
}
