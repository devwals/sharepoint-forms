import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vertical-line-properties',
  templateUrl: './vertical-line-properties.component.html',
  styleUrls: ['./vertical-line-properties.component.scss']
})
export class VerticalLinePropertiesComponent implements OnInit {

  @Input() model: any;
  
  constructor() { }

  ngOnInit() {
  }

}
