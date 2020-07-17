import { Injectable } from '@angular/core';
import { sp, SPRequestExecutorClient, SPRestAddIn } from "@pnp/sp-addinhelpers";
import { HttpClient } from '@angular/common/http';
import { IFormService } from './interfaces/iform-service';
import * as moment from 'moment';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})

export class SPFormService implements IFormService {
  public addInWenUrl = this.getParameterByName("SPAppWebUrl", location.href);
  public hostWebUrl = this.getParameterByName("SPHostUrl", location.href);
  public context = sp;
  private spLoaded = 0;

  constructor(private http: HttpClient) { }

  loadSP(): Promise<any> {

    if (this.spLoaded == 0) {
      return new Promise((resolve, reject) => {
        resolve(sp);
      });
    } else {
      return new Promise((resolve, reject) => {
        $.getScript(this.hostWebUrl + "/_layouts/15/SP.RequestExecutor.js").bind(this)
          .done(function (script, textStatus) {

            sp.setup({
              sp: {
                fetchClientFactory: () => {
                  return new SPRequestExecutorClient();
                },
                headers: {
                  Accept: 'application/json; odata=nometadata'
                }
              }
            });

            this.spLoaded = true;
            resolve(sp);

          })
          .fail(function (jqxhr, settings, exception) {
            this.spLoaded = false;
            reject(exception);
          });
      });
    }
  }

  cdWeb() {
    return sp.crossDomainWeb(this.addInWenUrl, this.hostWebUrl);
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  private getHostServerRelativeUrl() {
    let url = new URL(this.hostWebUrl);
    // console.log(url.href.substr(url.href.indexOf(url.origin) + url.origin.length));
    return url.href.substr(url.href.indexOf(url.origin) + url.origin.length);
  }

  getFormsByList(Id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadSP().then(() => {
        this.cdWeb().lists.getByTitle("Devwals Forms").items
          .filter(`RefId eq '${Id}'`)
          .select("ID,FileLeafRef,Title,Modified,Created,RefId,RefName,Author/Title,Editor/Title")
          .expand("Author,Editor")
          .get().then((r) => {
            resolve(r);
          },
            (e) => {
              reject(e);
            });
      });
    });
  }

  getFormUrl(formId, webUrl, type) {
    let formUrl = `${webUrl}/DevwalsForms/Pages/viewer.aspx?FormId=${formId}%26SPHostUrl=${this.hostWebUrl}%26SPAppWebUrl=${this.addInWenUrl}`;
    switch (type) {
      case "edit":
        formUrl = `${formUrl}%26Mode=edit`;
        break;
      case "new":
        formUrl = `${formUrl}%26Mode=new`;
      default:
        break;
    }
    return formUrl;
  }

  /***Interface methods ***/
  getForms(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadSP().then(() => {
        this.cdWeb().lists.getByTitle("Devwals Forms").items
          .select("ID,FileLeafRef,Title,Modified,Created,RefId,RefName,Author/Title,Editor/Title")
          .expand("Author,Editor")
          .get().then((r) => {
            resolve(r);
          },
            (e) => {
              reject(e);
            });
      });
    });
  }

  getFormById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadSP().then(() => {
        this.cdWeb().lists.getByTitle("Devwals Forms").items.getById(id)
          .select("ID,FileLeafRef,Title,Modified,Created,RefId,RefName,Author/Title,Editor/Title,File")
          .expand("Author,Editor,File")
          .get().then((r) => {
            this.cdWeb().getFileByServerRelativeUrl(r.File.ServerRelativeUrl).getJSON().then(f => {
              resolve({ item: r, file: f });
            })
          },
            (e) => {
              reject(e);
            });
      });
    });
  }

  getFormByName(formName: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  saveForm(formName: string, data: any, refName: string, refID: string, override?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadSP().then(() => {
        this.cdWeb().getFolderByServerRelativeUrl(this.getHostServerRelativeUrl() + "/Devwals Forms")
          .files.add(formName, data, (override ? override : false)).then((r) => {
            r.file.getItem().then(item => {
              this.cdWeb().lists.getByTitle("Devwals Forms").items.getById(item["ID"]).update({
                Title: formName,
                RefName: refName,
                RefId: refID
              }).then(r1 => {
                resolve(item);
              }, e1 => {
                reject(e1);
              });
            });
          },
            (e) => {
              reject(e);
            });
      });
    });
  }

  updateFormName(formName: string, fileId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cdWeb().lists.getByTitle("Devwals Forms").items.getById(fileId).update({
        FileLeafRef: formName,
        Title: formName
      }).then(r => {
        resolve(r);
      }, e1 => {
        reject(e1);
      });
    });
  }

  deleteForm(formName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadSP().then(() => {
        this.cdWeb().getFileByServerRelativeUrl(this.getHostServerRelativeUrl() + "/Devwals Forms/" + formName)
          .delete().then((r) => {
            resolve(r);
          },
            (e) => {
              reject(e);
            });
      });
    });
  }

  generateFormFieldJSON(field: any, listData: any) {
    console.log("field : ", field);

    let formField: any = {
      "label": field.Title,
      "type": this.typeComputer(field.TypeAsString, field.RichText, field.DisplayFormat),
      "sptype": field.TypeAsString.toLowerCase(),
      "input": true,
      "key": field.InternalName,
      "defaultValue": field.DefaultValue,
      "field": field.InternalName,
      "listName": listData.Name || listData.name || listData.Title,
      "listId": listData.Id || listData.id,
      // "id": listData.Id + field.InternalName,
      "validation": this.validationComputer(field.TypeAsString, field.Required),
      "readOnly": field.ReadOnlyField,
      "allowMultipleValues": field.AllowMultipleValues
    };  

    if(formField.type == "choice") {
      let ret = [];

      Object.keys(field.Choices).map(e => {
        var obj = { label: field.Choices[e], value: field.Choices[e]}
        ret.push(obj);
      }) 

      formField["options"] = ret;
      console.log("ret : ", ret );

      formField["displayType"] = this.multiChoiceDisplayType(field.EntityPropertyName);
    }

    if(formField.type == "yesno") {
      formField["options"] = [
        {value: true, label: "Yes"},
        {value: false, label: "No"}
      ]
    }

    if(formField.sptype == "note") {
      formField["richtext"] = field.RichText;
    }

    if(formField.sptype == "datetime") {
      if(formField.defaultValue == "[today]") {
        formField.defaultValue = this.getCurrentDateTime();
      } else if(formField.defaultValue) {
        formField.defaultValue = moment((formField.defaultValue)).format('YYYY-MM-DDTHH:mm')
      } else {
        formField.defaultValue = null;
      }
    }

    if(formField.sptype == "datetime") {
      formField["displayFormat"] = field.DisplayFormat;
    }

    //for type managedmetadata,lookup,people
    if (field.LookupList) {
      formField.lookupList = field.LookupList
      formField.lookupWebId = field.LookupWebId;
      formField.lookupField = field.LookupField;
    }

    if (formField.type == "managedmetadata") {
      formField.sspId = field.SspId;
      formField.termSetId = field.TermSetId;
    }
    
    //add default json for other components
    if(formField.type == "yesno") {
      formField.displayLabel = true;
      
      formField.properties = {
        displayType : "switch rounded"
      };
    }
    return formField;
  }

  typeComputer(type: string, isRichText?: boolean, displayFormat?: number) {
    switch (type.toLowerCase()) {
      case "counter":
      case "currency":
        return "number";
      case "file":
      case "text":
        return "textfield";
      case "computed": 
        return "textfield"; //Change later
      case "attachments": 
        return "file";
      case "note": 
        return this.multiLineTypeComputer(isRichText); //change later (check if rich text or not)
      case "taxonomyfieldtypemulti":
      case "taxonomyfieldtype":
        return "managedmetadata";
      case "usermulti": 
      case "user": 
        return "user";
      case "boolean":
        return "yesno";
      case "outcomechoice":
        return "choice";
      case "multichoice":
        return "choice";
      case "PublishingScheduleStartDateFieldType": 
        return "datetime";
      case "PublishingScheduleEndDateFieldType": 
        return "datetime";
      case "lookupmulti": 
        return "lookup";
      case "datetime": 
        return this.dateTimeTypeComputer(displayFormat);
      default: return type.toLowerCase();
    }
  }

  multiLineTypeComputer(isRichText: boolean) {
    switch (isRichText) {
      case true: return "richtext";
      case false: return "textfieldmulti";
      default: return "Textfield";
    }
  }

  dateTimeTypeComputer(displayFormat) {
    switch(displayFormat) {
      case 0 : return "date";
      case 1 : return "datetime";
      default: return "datetime";
    }
  }

  validationComputer(type: string, required: boolean) {
    switch (this.typeComputer(type, false)) {
      case "document": return { "required": true };
      default: return { "required": required };
    }
  }

  multiChoiceDisplayType(propertyName) {
    switch (propertyName) {
      case "Drop_x0020_Down": return "Dropdown";
      case "Radio": return "Radio";
      default: return "Checkbox";
    }
  }

  getCurrentDateTime() {
    var date = new Date();

    var hour = date.getHours();
    var minute = date.getMinutes();

    var day: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var datetime = year + "-" + month + "-" + day + "T" + hour + ":" + minute;  

    return datetime;
  }
  /***End Interface methods ***/
}
