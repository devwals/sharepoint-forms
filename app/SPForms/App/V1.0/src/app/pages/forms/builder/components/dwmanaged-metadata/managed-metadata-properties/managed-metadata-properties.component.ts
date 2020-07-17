import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'managed-metadata-properties',
  templateUrl: './managed-metadata-properties.component.html',
  styleUrls: ['./managed-metadata-properties.component.scss']
})
export class ManagedMetadataPropertiesComponent implements OnInit {

  @Input() model: any;

  constructor() { }

  ngOnInit() {
    if(!this.model.allowMultipleValues) {
      this.model.allowMultipleValues = false;
    }
  }
}
