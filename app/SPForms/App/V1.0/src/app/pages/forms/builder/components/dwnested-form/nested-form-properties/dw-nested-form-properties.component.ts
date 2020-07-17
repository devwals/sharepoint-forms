import { Component, OnInit, Input } from '@angular/core';
import { SPDataService } from '../../../../../../services/sp-data.service';

@Component({
  selector: 'dw-nested-form-properties',
  templateUrl: './dw-nested-form-properties.component.html',
  styleUrls: ['./dw-nested-form-properties.component.scss']
})
export class DWNestedFormPropertiesComponent implements OnInit {

  @Input() model: any;

  lists = [];
  selectedList:any;

  constructor(
    private ds: SPDataService
  ) { }

  ngOnInit() {
    this.getLists();
  }

  getLists() {
    this.ds.getLists().then((r: any) => {
      this.lists = r;
      console.log("Lists loaded")
      console.log(this.lists);
    }, (e) => {
      console.log("Forms Error Response: {0}", JSON.stringify(e, null, 4));
    });
  }

  onListSelected() {
    this.model.listId = this.selectedList.Id;
    this.model.listName = this.selectedList.Title;   
  }

}
