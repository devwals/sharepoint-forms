import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'yes-no-properties',
  templateUrl: './yes-no-properties.component.html',
  styleUrls: ['./yes-no-properties.component.scss']
})
export class YesNoPropertiesComponent implements OnInit {

  @Input() model: any;
  
  constructor() { }

  ngOnInit() {
    console.log("yes no model : ", this.model);
  }
}
