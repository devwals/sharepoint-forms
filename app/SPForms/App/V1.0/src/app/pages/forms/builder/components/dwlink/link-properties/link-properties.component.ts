import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'link-properties',
  templateUrl: './link-properties.component.html',
  styleUrls: ['./link-properties.component.scss']
})
export class LinkPropertiesComponent implements OnInit {

  @Input() model: any;
  
  constructor() { }

  ngOnInit() {
  }

}
