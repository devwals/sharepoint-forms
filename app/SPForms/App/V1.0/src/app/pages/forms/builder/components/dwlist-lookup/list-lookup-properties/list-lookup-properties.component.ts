import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'list-lookup-properties',
  templateUrl: './list-lookup-properties.component.html',
  styleUrls: ['./list-lookup-properties.component.scss']
})
export class ListLookupPropertiesComponent implements OnInit {

  @Input() model: any;
  
  constructor() { }

  ngOnInit() {
    if(!this.model.allowMultipleValues) {
      this.model.allowMultipleValues = false;
    }
  }
}
