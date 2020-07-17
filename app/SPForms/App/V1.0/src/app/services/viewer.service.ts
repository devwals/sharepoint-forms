import { SPFormlyService } from './sp-formly.service';
import { SPDataService } from './sp-data.service';
import { Injectable, OnInit } from '@angular/core';
import { SPFormService } from './sp-form.service';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ViewerRulesService } from './viewer.rules.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewerService implements OnInit {

  mode: any;

  private version = new BehaviorSubject(1);
  version$ = this.version.asObservable();

  private formAction = new BehaviorSubject(null);
  formAction$ = this.formAction.asObservable();

  private isFormValid = new BehaviorSubject(false);
  isFormValid$ = this.isFormValid.asObservable();

  private formState = new BehaviorSubject(true);
  formState$ = this.formState.asObservable();

  forms = [];
  models = {};

  fields: FormlyFieldConfig[] = [];
  formId: any;
  itemId: any;
  formData: any;

  private model: any;
  private refId: any;

  constructor(private ds: SPDataService,
    private fs: SPFormService,
    private toastr: ToastrService,
    private formlyService: SPFormlyService,
    private rs: ViewerRulesService
  ) { }

  ngOnInit() {
  }

  getMode() {
    return this.mode;
  }

  setMode(mode: any) {
    this.mode = mode;
  }

  isNewMode(): boolean {
    let mode = this.fs.getParameterByName("Mode", location.href);
    if (mode == "new") {
      return true;
    }
    return false;
  }

  setVersion(version: number) {
    this.version.next(version);
  }

  setFormAction(formAction) {
    this.formAction.next(formAction);
  }

  getFormAction() {
    return this.formAction$;
  }

  addForm(form: any) {

    form.valueChanges
    .pipe(distinctUntilChanged())
    .subscribe(v=>{
      //TODO: Do not run this on first load of the application
      this.executeConditionalLogic();
    });

    //TODO: run this.executeConditionalLogic(); on first load.
    this.forms.push(form);
  }

  getForm() {
    return this.forms;
  }

  setFormValidity(formValidity) {
    this.isFormValid.next(formValidity);
  }

  setFormEnabled(formState) {
    this.formState.next(formState);
  }

  getFormState() {
    return this.formState$;
  }

  setModel(model, list?) {
    // Object.assign(this.models["All"], model);

    this.models["All"] = this.models["All"] || {};
    const keys = Object.keys(model);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      this.models["All"][list.listId + "#" + key] = model[key];
    }

    // let newModel = {};
    // const keys = Object.keys(model);
    // for (let index = 0; index < keys.length; index++) {
    //   const key = keys[index];
    //   newModel[list.listId + "#" + key] = model[key];
    // }
    // this.models[list.title || list.listName] = newModel;
    
  }

  getModel(list?) {
    if(list){
      return this.models[list.title || list.listName];
    }else if(this.models["All"]){
      return this.models["All"];
    }else{
      return {};
    }
    
  }

  cleanModel(model, list): any {
    const keys = Object.keys(model);
    let cleanModel = {};
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];

      cleanModel[key.substr(key.indexOf("#") + 1)] = model[key];
    }

    console.log(cleanModel);
    return cleanModel;

  }
  //If formgroup consists of only disabled fields..status = "DISABLED"
  //If formgroup consists of disabled field and regular fields..status == status of regular fields
  checkValid() {
    let validFormGroups: any;
    for (let index = 0; index < this.forms.length; index++) {
      validFormGroups = this.forms.filter(t => { return t.status == "DISABLED" || t.status == "VALID" })
    }

    //Checking if all formgroups are valid
    if (validFormGroups.length == this.forms.length) {
      return true
    } else {
      return false;
    }
  }

  submit(model: any, baseType: any, refId: any) {

    // console.log("this.model : ", this.model);
    // console.log("model : ", model);
    this.model = model;
    this.refId = refId;

    console.log("forms : ", this.getForm())
    let isValid = this.checkValid();
    this.setFormValidity(isValid);

    const cleanModel = this.cleanModel(model, null);
    const newModel = this.getDataToSave(this.model);
    cleanModel.Id ? newModel.Id = cleanModel.Id : '';
    console.log("model : ", model);
    console.log("newModel : ", newModel);

    if (isValid && baseType == 1) { 
      this.submitLibrary(newModel, cleanModel.documentToUpload);
    } else if (isValid) {
      const filesToAttach = model.ItemAttachments ? model.ItemAttachments.ToAttach : undefined;
      const filesToDelete = model.ItemAttachments ? model.ItemAttachments.ToDelete : undefined;
      this.submitList(newModel, filesToAttach, filesToDelete);
    } else {
      console.log("form is not valid");
      this.toastr.error('Missing inputs for required fields.', 'Form Invalid', { closeButton: true });
      //Set all fields as touched.

      let forms = this.getForm();

      for (let i = 0; i < forms.length; i++) {
        Object.keys(forms[i].controls).forEach(key => {
          forms[i].controls[key].touched = true;
        });
      }
      console.log(forms)
    }
  }

  submitList(data, filesToAttach?, filesToDelete?) {
    this.ds.save(
      { listId: this.refId, data: data }, filesToAttach, filesToDelete
    ).then((r: any) => {
      // r.data.Id ? this.model.Id = r.data.Id : '';//set model Id for the next save
      r.data.Id || r.data.ID ? this.model.Id = (r.data.Id || r.data.ID) : '';
      this.toastr.success('Form saved successfully!', 'DONE!',
        { closeButton: true });

      //Use a service to update components as form state does not have the capability

      this.setFormEnabled(false);
      this.setVersion(this.version.getValue() + 1);

      let source = this.getParameterByName("Source", location.href);
      console.log("source : ", source);

      setTimeout(window.location.href = source, 1000);

    }, e => {
      console.log(e);
      this.setFormEnabled(true);

      this.toastr.error('Failed to save the form!', 'ERROR!',
        { closeButton: true });
      this.toastr.error(e.message, '',
        { closeButton: true });
    });
  }

  submitLibrary(model, documentToUpload) {
    (documentToUpload
      ? this.ds.saveLibrary(documentToUpload.file.name, documentToUpload.file,
        {
          listId: this.formData.lists[0].listId,
          listName: this.formData.lists[0].title,
          data: model
        }, true
      )
      : this.ds.save(
        { listId: this.refId, data: model }
      ))
      .then((r: any) => {
        r.data.Id || r.data.ID ? this.model.Id = (r.data.Id || r.data.ID) : '';
        this.setFormEnabled(false);
        this.toastr.success('Saved successfully!', 'DONE!',
          { closeButton: true });

        let source = this.getParameterByName("Source", location.href);
        console.log("source : ", source);

        setTimeout(window.location.href = source, 1000);

      }, e => {
        console.log(e);
        this.setFormEnabled(true);
        this.toastr.error('Save failed!', 'ERROR!',
          { closeButton: true });
        this.toastr.error(e.message, '',
          { closeButton: true });
      });
  }

  getDataToSave(model) {
    let newModel: any = {};
    let cleanModel: any = this.cleanModel(model, null);
    //for (let index = 0; index < this.fields.length; index++) {
    //Get the flat list of fields to build the new model to save
    for (let index = 0; index < this.formlyService.filedsList.length; index++) {
      const element = this.formlyService.filedsList[index];
      if (!Object.keys(cleanModel).find(f => f == element.templateOptions.originalFieldOptions.field)) {
        continue;
      }
      switch (element.templateOptions.type) {
        case "lookup":
        case "user":
          if (!element.templateOptions.originalFieldOptions.ReadOnlyField) {
            const field = element.templateOptions.originalFieldOptions.field + "Id";
            newModel[field] = cleanModel[field];
          }
          break;
        case "managedmetadata":
          if (element.templateOptions.originalFieldOptions.allowMultipleValues) {
            if (cleanModel[element.templateOptions.originalFieldOptions.field]) {
              const associatedField = cleanModel[element.templateOptions.originalFieldOptions.field].associatedField;
              newModel[associatedField] = cleanModel[element.templateOptions.originalFieldOptions.field].values;
            }

            // newModel[associatedField] = "14;#Chiefly Financial|b12f61c5-87a7-4e20-99d7-4c86f79da599;"
            // newModel[associatedField] = null;
          } else {
            if (Array.isArray(cleanModel[element.templateOptions.originalFieldOptions.field])) {
              newModel[element.templateOptions.originalFieldOptions.field]
                = cleanModel[element.templateOptions.originalFieldOptions.field][0]
            } else {
              newModel[element.templateOptions.originalFieldOptions.field]
                = cleanModel[element.templateOptions.originalFieldOptions.field]
            }
          }
          break;
        case "document":
          newModel.documentToUpload = cleanModel.documentToUpload.file
          break;
        case "checkbox":
          if (element.templateOptions.originalFieldOptions.sptype == "multichoice") {
            newModel[element.templateOptions.originalFieldOptions.field] =
              {
                "__metadata": { "type": "Collection(Edm.String)" },
                "results": cleanModel[element.templateOptions.originalFieldOptions.field]
              }
          } else {
            newModel[element.templateOptions.originalFieldOptions.field]
              = cleanModel[element.templateOptions.originalFieldOptions.field]
          }
          break;
        default:
          newModel[element.templateOptions.originalFieldOptions.field]
            = cleanModel[element.templateOptions.originalFieldOptions.field]
          break;
      }
    }
    return newModel;
  }

  editPressed() {
    console.log("edit");
    this.setFormEnabled(true);
  }

  print() {
    window.print();
  }

  back() {
    history.back();
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

  executeConditionalLogic() {
    if(this.formData.rules && this.formData.rules.length > 0){
      this.rs.executeFormRules(this.getModel(), this.formlyService.filedsList, this.formData.rules);
    }
  }
}
