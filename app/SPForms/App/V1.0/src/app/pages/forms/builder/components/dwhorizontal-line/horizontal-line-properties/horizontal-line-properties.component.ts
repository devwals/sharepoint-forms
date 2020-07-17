import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'horizontal-line-properties',
  templateUrl: './horizontal-line-properties.component.html',
  styleUrls: ['./horizontal-line-properties.component.scss']
})
export class HorizontalLinePropertiesComponent implements OnInit {

  @Input() model: any;
  
  constructor() { }

  ngOnInit() {
  }

}
