import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dwb-list-rules',
  templateUrl: './dwb-list-rules.component.html',
  styleUrls: ['./dwb-list-rules.component.scss']
})
export class DWBListRulesComponent implements OnInit {

  form: any = {};
  fields: any[] = [];

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {

    console.log("Printing form from the rules builder.");
    console.log(this.form);
    this.getFormModels(this.form.components);
    this.initializeQuery();
  }

  initializeQuery() {
    for (let index = 0; index < this.form.lists.length; index++) {
      const list = this.form.lists[index];
      list.query = list.query || { condition: 'and', rules: [{ field:"", opearator: "", entity: "", value:"" }], };
      // list.query = { condition: 'and', rules: [{ field:"", opearator: "", entity: "", value:"" }], };
    }
  }

  //This will get a flat list of lists and model for the lists
  getFormModels(components: any[]) {
    for (let index = 0; index < components.length; index++) {
      const component = components[index];
      if (component.children && component.children.length > 0) {
        this.getFormModels(component.children);
      } else {
        this.setComponent(component)
      }
    }
  }

  setComponent(component) {
    const listId = component.listId || "All";
    const listName = component.listName || "All";
    this.fields.push(
      {
        key: `${listId}#${component.field}`,
        label: component.label,
        type: component.type,
        entity: listName,
        operators: ['='] //TODO get operators by type
      }
    );

  }


  deleteCondition(e, index) {

  }

  updateConditions(e: any) {
    this.activeModal.close();
  }

  getListFields(list) {
    return this.fields.filter(f=>f.entity == list);
  }

  getOtherLists(list) {
    return this.form.lists.filter(l => l.title != list.title);
  }


}
