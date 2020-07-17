import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'number-properties',
  templateUrl: './number-properties.component.html',
  styleUrls: ['./number-properties.component.scss']
})
export class NumberPropertiesComponent implements OnInit {

  @Input() model: any;
  
  constructor() { }

  ngOnInit() {
  }

}
