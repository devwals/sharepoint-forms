import { Component, OnInit, Input } from '@angular/core';
import { SPDataService } from '../../../../../../services/sp-data.service';
import { SPFormService } from '../../../../../../services/sp-form.service';
import { isNullOrUndefined } from 'util';
import { stringIsNullOrEmpty } from '@pnp/common';

@Component({
  selector: 'sharepoint-properties',
  templateUrl: './sharepoint-properties.component.html',
  styleUrls: ['./sharepoint-properties.component.scss']
})
export class SharepointPropertiesComponent implements OnInit {

  @Input() model: any;
  @Input() listData: any;
  loading: boolean = true;
  message: string = null;
  //selectedList:any;

  selectUndefinedOptionValue: any;

  fields: any;
  lists: any[];

  constructor(
    private sps: SPDataService,
    private fs: SPFormService
  ) { }

  ngOnInit() {
    if (isNullOrUndefined(this.model.listId) || stringIsNullOrEmpty(this.model.listId)) {
      this.model.listName = this.listData.name;
      this.model.listId = this.listData.id;
    }

    this.getLists();
    this.getFields();
  }

  getLists() {
    this.sps.getLists().then((r: any[]) => {
      this.lists = r;
    },
      e => {
        //TODO: display message here
      });
  }

  getFields() {
    this.fields = [];
    let fieldsData = [];
    this.sps.getListFields(this.model.listId)
      .then((res: any) => {
        res.filter(data => {

          if (this.fs.typeComputer(data.TypeAsString, data.RichText, data.DisplayFormat) == this.model.type) {
            fieldsData.push(data);
          }

          this.loading = false;
          this.fields = fieldsData;
          // console.log(fieldsData);

        })

        if (this.fields.length == 0) {
          this.message = "No SharePoint Fields found for type " + this.model.type;
        }
      }, (e) => {
        console.log("Forms Error Response: {0}", JSON.stringify(e, null, 4));
      });
  }

  onListChanged(e){
    const selectedList = this.getSelectedList();
    this.model.listName = selectedList.Title;
    this.getFields();
  }

  onFieldSelected() {
    const selectedList = this.getSelectedList();
    const selectedField = this.fields.find(f => f.InternalName == this.model.field);
    const field = this.fs.generateFormFieldJSON(selectedField, selectedList);
    Object.assign(this.model, field);
  }

  private getSelectedList(){
    return this.lists.find(l=>l.Id == this.model.listId);
  }
}
