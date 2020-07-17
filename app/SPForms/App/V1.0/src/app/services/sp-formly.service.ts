import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ViewerRulesService } from './viewer.rules.service';

@Injectable({
  providedIn: 'root'
})

export class SPFormlyService {

  filedsList = [];

  constructor(private rs: ViewerRulesService) { }

  getFormlySchema(fields): FormlyFieldConfig[] {
    const formlyFields: FormlyFieldConfig[] = [];
    for (let index = 0; index < fields.length; index++) {
      const element = fields[index];
      formlyFields.push({
        key: element.key ? (element.listId || "") + "#" + element.key : element.label,//for unique key
        // key: element.key ? element.key : element.label,//for unique key
        type: this.getFieldType(element.type, element.displayType),
        wrappers: this.getWrapper(element.type),
        defaultValue: this.getDefaultValue(element.defaultValue, element.type),
        // focus: false,
        templateOptions: {
          type: this.getFieldTemplateType(element.type),
          label: element.label,
          placeholder: element.placeholder,
          required: this.getRequired(element),
          disabled: this.getDisabled(element),
          description: element.helpBlock,
          originalFieldOptions: element,
          options: element.options
        },
        expressionProperties: {
          'templateOptions.disabled': (model: any, formState: any) => {
            // access to the main model can be through `this.model` or `formState` or `model
            let disabledRule = false;
            const ruleOutput = this.rs.conditionalLogicOutputs[element.key ? (element.listId || "") + "#" + element.key : element.label];
            if (ruleOutput
              && ruleOutput.disabled) {
              disabledRule = ruleOutput.disabled;
            }
            return formState.disabled || element.readOnly || element.disabled || disabledRule;
          }
        },
        hideExpression: (model: any, formState: any) => {
          let output = false;
          const ruleOutput = this.rs.conditionalLogicOutputs[element.key ? (element.listId || "") + "#" + element.key : element.label];
          if (ruleOutput
            && ruleOutput.hidden) {
            output = ruleOutput.hidden;
          }
          return output;
        },
      });
    }

    this.filedsList = this.filedsList.concat(formlyFields);
    return formlyFields;
  }

  getDefaultValue(defaultValue, type) {
    switch (type.toLowerCase()) {
      case "choice":
        return defaultValue ? defaultValue : "";
      case "managedmetadata":
      case "user":
      case "lookup":
        return null;
      default: return defaultValue;
    }
  }

  getWrapper(type) {
    switch (type.toLowerCase()) {
      case "choice":
        return ['dw-bootstrap'];
      default: null
    }
  }

  getRequired(element: any) {
    // if(element.type == "attachment") { //attachment has custom required.
    //   return false;
    // } else
    if (!element.validation) {
      return false;
    } else if (!element.validation.required || element.validation.required == undefined) {
      return false;
    } else {
      return element.validation.required;
    }
  }

  getDisabled(element: any) {
    if (element.disabled || element.readOnly) {
      return true;
    } else {
      return false;
    }
  }

  getFieldType(fieldType, displayType?) {
    switch (fieldType.toLowerCase()) {
      case "lookup":
        return "lookup";
      case "date":
        return "date";
      case "textfield":
        return "textfield";
      case "button":
        return "button";
      case "document":
        return "document";
      case "yesno":
        return "yesno";
      case "verticalline":
        return "verticalline";
      case "horizontalline":
        return "horizontalline";
      case "link":
        return "link";
      case "label":
        return "label";
      case "image":
        return "image";
      case "choice":
        return this.getChoiceType(displayType);
      case "number":
        return "number";
      case "textfieldmulti":
        return "textfieldmulti";
      case "richtext":
        return "richtext";
      case "calculated":
        return "calculated";
      case "datetime":
        return "datetime";
      case "file":
        return "file";
      case "tabs":
        return "tabs";
      case "section":
        return "section";
      case "user":
        return "user";
      case "columns":
        return "columns";
      case "managedmetadata":
        return "managedmetadata";
      case "attachment":
        return "attachment";
      case "document":
        return "file";
      default:
        return "input";
    }
  }

  getChoiceType(displayType) {

    switch (displayType.toLowerCase()) {
      case "dropdown": return "select"
      case "checkbox": return "multicheckbox"
      case "radio": return "radio"
      default: return "select"
    }
  }

  getFieldTemplateType(fieldType) {
    switch (fieldType.toLowerCase()) {
      case "richtext":
      case "note":
        return "textarea";
      case "datetime":
        return "datetime-local";
      case "choice":
        return "checkbox";
      case "attachments":
      case "document":
        return "file";
      default:
        return fieldType.toLowerCase();
    }
  }
}
