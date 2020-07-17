import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'date-time-properties',
  templateUrl: './date-time-properties.component.html',
  styleUrls: ['./date-time-properties.component.scss']
})
export class DateTimePropertiesComponent implements OnInit {
  @Input() model: any;
  
  constructor() { }

  ngOnInit() { }
}
