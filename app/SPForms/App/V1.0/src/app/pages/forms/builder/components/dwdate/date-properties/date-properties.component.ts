import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'date-properties',
  templateUrl: './date-properties.component.html',
  styleUrls: ['./date-properties.component.scss']
})
export class DatePropertiesComponent implements OnInit {

  @Input() model: any;

  constructor() { }

  ngOnInit() { }
}
