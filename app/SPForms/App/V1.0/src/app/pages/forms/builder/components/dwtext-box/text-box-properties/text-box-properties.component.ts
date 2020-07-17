import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'text-box-properties',
  templateUrl: './text-box-properties.component.html',
  styleUrls: ['./text-box-properties.component.scss']
})
export class TextBoxPropertiesComponent implements OnInit {

  @Input() model: any;
  
  constructor() { }

  ngOnInit() {
  }
}
