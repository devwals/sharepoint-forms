import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'plain-text-multi-line-properties',
  templateUrl: './plain-text-multi-line-properties.component.html',
  styleUrls: ['./plain-text-multi-line-properties.component.scss']
})
export class PlainTextMultiLinePropertiesComponent implements OnInit {

  @Input() model: any;
  
  constructor() { }

  ngOnInit() { }

}
