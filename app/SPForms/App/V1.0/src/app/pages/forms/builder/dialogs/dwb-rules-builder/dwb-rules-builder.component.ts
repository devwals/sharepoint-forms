import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QueryBuilderConfig } from 'angular2-query-builder';
import * as $ from 'jquery';
import { stringIsNullOrEmpty } from '@pnp/common';
import * as _ from 'lodash';
import { FieldMap } from 'angular2-query-builder/dist/components/query-builder';

@Component({
  selector: 'dwb-rules-builder',
  templateUrl: './dwb-rules-builder.component.html',
  styleUrls: ['./dwb-rules-builder.component.scss']
})

export class DWBRulesBuilderComponent implements OnInit {

  form: any = {};
  formFields: any[] = [];
  entityConfig: QueryBuilderConfig = {
    entities: {},
    fields: {},
  };

  queries = [
    { condition: 'and', rules: [], then: {}, else: {} }
  ];
  public allowRuleset: boolean = false;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.flattenFormFields(this.form.components);
    this.setEntityConfigFields();
    this.queries = this.form.rules || this.queries;

    //JQuery hack to prevent page refresh due to the button type missing
    $('body').on('click', '.q-button', function (e) {
      e.preventDefault();
    });

    this.setRulesCompatibility();
  }

  setRulesCompatibility() {
    for (let index = 0; index < this.form.rules.length; index++) {
      const element = this.form.rules[index];
      if (!element.then) element.then = {};
      if (!element.else) element.else = {};
    }
  }

  //This will get a flat list of lists and model for the lists
  flattenFormFields(components: any[]) {
    for (let index = 0; index < components.length; index++) {
      const component = components[index];
      if (component.children && component.children.length > 0) {
        this.flattenFormFields(component.children);
      } else {
        this.formFields.push(component);
      }
    }
  }

  setEntityConfigFields() {
    let entityConfigFields: any = {};
    for (let index = 0; index < this.formFields.length; index++) {
      const component = this.formFields[index];
      const listId = component.listId || "All";
      const listName = component.listName || "All";

      if (!this.entityConfig.entities[listName]) {
        this.entityConfig.entities[listName] = this.entityConfig.entities[listName] || { name: listName };
      }

      //Restrict by text and number fields only
      if (component.type == "textfield" || component.type == "number") {
        entityConfigFields[`${listId}#${component.field}`] =
        {
          name: component.label,
          type: component.type,
          entity: listName,
          //operators: ['=', '<=', '>'] //TODO get operators by type
          operators: ['=']
        };
      }

    }

    this.entityConfig.fields = entityConfigFields;
  }

  addCondition(e) {
    this.queries.push({ condition: 'and', rules: [], then: {}, else: {} });
  }

  deleteCondition(e, index) {
    this.queries.splice(index, 1);
  }

  updateConditions(e: any) {
    this.form.rules = this.queries;
    this.activeModal.close(this.queries);
  }

  getFieldByEntity(entity) {
    if (stringIsNullOrEmpty(entity)) return [];

    let fields = [];
    let list = this.form.lists.find(l => l.title == entity);
    let components = this.formFields.filter(c => c.listId == list.listId);

    for (let index = 0; index < components.length; index++) {
      const element = components[index];
      fields.push({ label: element.label, key: `${list.listId}#${element.key}` });
    }

    return fields;
  }

}
