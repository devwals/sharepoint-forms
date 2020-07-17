import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IComponent } from '../iComponent.builder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementPropertiesComponent } from '../../dialogs/element-properties/element-properties.component';

@Component({
  selector: 'dwtab',
  templateUrl: './dwtab.component.html',
  styleUrls: ['./dwtab.component.scss']
})
export class DWTabComponent implements OnInit, IComponent {
  static type = "tabs";

  @Input() model: any;
  @Input() template: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();

  schema:any = {
    validation: [],
    properties: ["id", "type", "label", "class"]
  };

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
    
    activeModal.componentInstance.view.elementItem = item;
    activeModal.componentInstance.listData = this.listData;
    activeModal.componentInstance.schema = this.schema;

    activeModal.result.then((obj) => {
      if(obj) {
        this.editRequest.emit(this.model);
      }
    });
  }

  add(item: any) {
    console.log(item);
    this.model.children.push(
      { name: 'Tab', label: 'Tab', type: 'tab', children: [] as any[], active: false }
    );
  }

  log(e) {
    this.logRequest.emit(e);
  }
}
