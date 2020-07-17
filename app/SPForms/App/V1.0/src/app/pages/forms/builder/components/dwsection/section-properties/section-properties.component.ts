import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'section-properties',
  templateUrl: './section-properties.component.html',
  styleUrls: ['./section-properties.component.scss']
})
export class SectionPropertiesComponent implements OnInit {

  @Input() model: any;

  constructor() { }

  ngOnInit() {
  }

}
