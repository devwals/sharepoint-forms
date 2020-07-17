import { ColumnItemPropertiesComponent } from './column-item-properties/column-item-properties.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IComponent} from '../../iComponent.builder';

@Component({
  selector: 'dwcolumn-item',
  templateUrl: './dwcolumn-item.component.html',
  styleUrls: ['./dwcolumn-item.component.scss']
})
export class DWColumnItemComponent  implements OnInit, IComponent {
  static type = "column";
  
  @Input() model: any;
  @Input() template: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  delete(item){
    this.deleteRequest.emit(item);
  }

  edit(item){
    const activeModal = this.modalService.open(ColumnItemPropertiesComponent,
      { size: 'lg', container: 'nb-layout', backdrop: 'static' }
    );
    
    activeModal.componentInstance.model = item;

    activeModal.result.then((obj) => {
      if(obj) {
        this.model = obj;
      }
    });
  }

  log(e){
    this.logRequest.emit(e);
  }
}
