import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IComponent} from '../iComponent.builder';

@Component({
  selector: 'dwpanel',
  templateUrl: './dwpanel.component.html',
  styleUrls: ['./dwpanel.component.scss']
})
export class DWPanelComponent implements OnInit, IComponent {
  static type = "panel";

  @Input() model: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    this.model.displayLabel = true;
  }

  delete(){
    this.deleteRequest.emit(this.model);
  }

  edit(){
    this.editRequest.emit(this.model);
  }

  log(e){
    this.logRequest.emit(e);
  }
}
