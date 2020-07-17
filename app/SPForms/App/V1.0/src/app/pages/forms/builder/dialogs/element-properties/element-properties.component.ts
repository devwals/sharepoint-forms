import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderTools } from '../../models/builder.tools';
import { SPDataService } from '../../../../../services/sp-data.service';
import { isNullOrUndefined } from 'util';
import { stringIsNullOrEmpty } from '@pnp/common';
import { BuilderService } from '../../../../../services/builder.service';

@Component({
  selector: 'element-properties',
  templateUrl: './element-properties.component.html',
  styleUrls: ['./element-properties.component.scss']
})
export class ElementPropertiesComponent implements OnInit {

  view: any = {};

  schema: any = {
    validation: [],
    properties: []
  };

  listData: any;

  model: any = {};
  showModel: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private ds: SPDataService,
    private bs: BuilderService
  ) { }

  ngOnInit() {
    const tool = BuilderTools.find(b => {
      return b.type.toLowerCase() == this.view.elementItem.type.toLowerCase();
    });

    const properties = Object.keys(tool);

    for (let index = 0; index < properties.length; index++) {
      const element = properties[index];
      if (this.view.elementItem[element] == undefined) {
        this.view.elementItem[element] = tool[element];
      }
    }

    console.log("model : ", this.model);

    Object.assign(this.model, this.view.elementItem);
  }

  updateObject() {
    Object.assign(this.view.elementItem, this.model);

    this.ds.getLists().then((r:any[]) => {
      //Now add list details of the item if not already in the form lists
      const itemList = this.bs.form.lists.filter(l => l.listId == this.model.listId);
      if (!isNullOrUndefined(this.model.listId)
        && !stringIsNullOrEmpty(this.model.listId)
        && itemList.length == 0) {
        
          const list = r.find(l => l.Id == this.model.listId);
          this.bs.form.lists.push({
            baseType: list.BaseType,
            listId: this.model.listId,
            title: this.model.listName
          });
      }
      this.activeModal.close(this.model);
      this.model = {};
    }, e => {
      //TODO: Display message
    });

  }

  cancel() {
    // console.log(this.model);
    this.activeModal.close();
  }
}
