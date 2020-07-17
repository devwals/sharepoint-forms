import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IComponent} from '../iComponent.builder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';

@Component({
  selector: 'dwcolumns',
  templateUrl: './dwcolumns.component.html',
  styleUrls: ['./dwcolumns.component.scss']
})
export class DWColumnsComponent implements OnInit, IComponent {
  static type = "columns";
  
  @Input() model: any;
  @Input() template: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();

  schema: any ={
    validation: [],
    properties: ["id", "type", "class"]
  }

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  delete(item: any) {
    this.deleteRequest.emit(item);
  }

  edit(item: any) {
    const activeModal = this.modalService.open(ElementPropertiesComponent,
      { size: 'lg', container: 'nb-layout', backdrop: 'static' }
    );
    
    activeModal.componentInstance.view.elementItem = this.model;
    activeModal.componentInstance.listData = this.listData;
    activeModal.componentInstance.schema = this.schema;

    activeModal.result.then((obj) => {
      if(obj) {
        this.model = obj;
        console.log(obj);
      }
    });
  }

  add(item: any) {
    console.log(item);
    this.model.children.push(
      { name: 'Column', label: 'Column', type: 'column', children: [] as any[], class: 'wide' }
    );
  }

  log(e) {
    this.logRequest.emit(e);
  }

}
