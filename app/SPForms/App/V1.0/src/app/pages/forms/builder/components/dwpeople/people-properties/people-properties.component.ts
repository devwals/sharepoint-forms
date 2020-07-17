import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'people-properties',
  templateUrl: './people-properties.component.html',
  styleUrls: ['./people-properties.component.scss']
})
export class PeoplePropertiesComponent implements OnInit {
  @Input() model: any;
  
  constructor() { }

  ngOnInit() {
    if(!this.model.allowMultipleValues) {
      this.model.allowMultipleValues = false;
    }
  }

}
