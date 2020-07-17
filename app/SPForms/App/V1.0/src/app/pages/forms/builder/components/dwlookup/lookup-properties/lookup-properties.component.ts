import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lookup-properties',
  templateUrl: './lookup-properties.component.html',
  styleUrls: ['./lookup-properties.component.scss']
})
export class LookupPropertiesComponent implements OnInit {

  @Input() model: any;
  
  constructor() { }

  ngOnInit() {
    if(!this.model.allowMultipleValues) {
      this.model.allowMultipleValues = false;
    }
  }
}
