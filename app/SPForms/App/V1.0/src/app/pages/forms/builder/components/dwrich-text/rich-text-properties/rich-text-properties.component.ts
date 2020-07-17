import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rich-text-properties',
  templateUrl: './rich-text-properties.component.html',
  styleUrls: ['./rich-text-properties.component.scss']
})
export class RichTextPropertiesComponent implements OnInit {
  
  @Input() model: any;

  constructor() { }

  ngOnInit() {
  }

}
