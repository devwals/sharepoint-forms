import { TabItemPropertiesComponent } from './../tab-item-properties/tab-item-properties.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IComponent } from '../../iComponent.builder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dwtab-item',
  templateUrl: './dwtab-item.component.html',
  styleUrls: ['./dwtab-item.component.scss']
})
export class DWTabItemComponent implements OnInit, IComponent {
  static type = "tab";
  
  @Input() model: any;
  @Input() template: any;
  @Input() listData: any;
  @Output() deleteRequest = new EventEmitter<any>();
  @Output() editRequest = new EventEmitter<any>();
  @Output() logRequest = new EventEmitter<any>();

  constructor(private modalService: NgbModal) { }

  ngOnInit() { }

  delete(item){
    this.deleteRequest.emit(item);
  }

  edit(item){
    const activeModal = this.modalService.open(TabItemPropertiesComponent,
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
