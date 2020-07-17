import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'tab-item-properties',
  templateUrl: './tab-item-properties.component.html',
  styleUrls: ['./tab-item-properties.component.scss']
})
export class TabItemPropertiesComponent implements OnInit {
  
  model: any = {};
  temp: any = {};

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    Object.assign(this.temp, this.model);
    console.log(this.temp);
  }

  updateObject() {
    Object.assign(this.model, this.temp);
    this.temp = {};
    this.activeModal.close(this.model);
  } 
  
  cancel() {
    console.log(this.temp);
    this.activeModal.close();
  }
}
