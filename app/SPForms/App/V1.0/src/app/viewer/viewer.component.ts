import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SPFormService } from '../services/sp-form.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { SPDataService } from '../services/sp-data.service';
import { ToastrService } from 'ngx-toastr';
import { SPFormlyService } from '../services/sp-formly.service';
import { ViewerService } from '../services/viewer.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'dw-form-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnDestroy {

  @Input() formId;
  @Input() itemId;

  alive = true;

  view: any = {
    form: {}
  };

  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions = {
    formState: {
      disabled: false
    },
  };
  formLoaded: boolean = false;

  constructor(
    private fs: SPFormService,
    private ds: SPDataService,
    private toastr: ToastrService,
    private formlyService: SPFormlyService,
    private vs: ViewerService
  ) {
  };

  ngOnInit() {

    this.vs.formAction$
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        if (res == 'save') {
          this.submit(this.model);
        }
      });

    if (this.formId > 0) {
      this.getForm();
    } else {
      this.formId = this.fs.getParameterByName("FormId", location.href);
      this.itemId = this.fs.getParameterByName("ID", location.href);

      this.getForm();
    }
  }

  getForm() {
    this.fs.getFormById(this.formId).then((res) => {

      this.view.form = res["file"];
      console.log("Form", this.view.form);
      this.view.item = res["item"];

      this.fields = this.formlyService.getFormlySchema(
        this.view.form.components
      );
      if (this.itemId && this.itemId > 0) {
        // this.getItem();
        this.getItems(0).then(r => {
          // this.model = this.vs.getModel();
          // console.log("model : ", this.model);
          // this.formLoaded = true;
          // this.vs.formData = this.view.form;
          // this.vs.addForm(this.form);
        }, e => {
          this.toastr.error(e, 'Error', { closeButton: true });
        });
      }else{
        this.resolveForm();
      }


      // if (!this.itemId) {
      //   this.fields = this.formlyService.getFormlySchema(
      //     this.view.form.components
      //   );
      //   return;
      // } else {
      //   this.getItem();
      // }

      // this._applicationRef.tick();  //A workaround to display data on browser back
    }, (e) => {
      this.toastr.error(e, 'Error', { closeButton: true });
      // this._applicationRef.tick();//A workaround to display data on browser back
    });
  }

  //Not used 
  getListQueryRule(rule: any) {
    let ruleQuery = "";
    for (let index = 0; index < rule.rules.length; index++) {
      const element = rule.rules[index];
      if (index == 0) {
        ruleQuery += "${element.field} eq " + this.model[rule.field];
      } else {
        //TODO: use operator
      }

    }
  }

  //Resolve form for display
  resolveForm() {
    this.model = this.vs.getModel();
    console.log("model : ", this.model);
    this.formLoaded = true;
    this.vs.formData = this.view.form;
    this.vs.addForm(this.form);
  }

  getItems(listIndex: number) {
    const list = this.view.form.lists[listIndex];

    return new Promise((resolve, reject) => {

      //TODO: The next two lines are hardcoded right now. Apply rules later
      //TODO: Also fix save
      let lookupValue: any = this.itemId;
      if (listIndex == 0) {
        lookupValue = this.itemId
      } else {
        lookupValue = 86;
      }

      this.ds.getItem(list.listId,
        lookupValue,
        this.isDocumentList(list.listId)
      )
        .then(r => {
          this.vs.setModel(r, list);
          if (listIndex != this.view.form.lists.length - 1) {
            this.getItems(++listIndex);
          } else {
            resolve();
            // this.model = this.vs.getModel();
            // console.log("model : ", this.model);
            // this.formLoaded = true;
            // this.vs.formData = this.view.form;
            // this.vs.addForm(this.form);
            this.resolveForm();
          }

        }, e => {
          this.toastr.error(e, 'Error', { closeButton: true });
          reject(e);
        });
    });

  }



  getItem() {
    // if (!this.itemId) {
    //   this.fields = this.formlyService.getFormlySchema(
    //     this.view.form.components
    //   );
    //   return;
    // }

    this.ds.getItem(this.view.item.RefId,
      this.itemId,
      this.isDocumentList(this.view.item.RefId)
    )
      .then(r => {
        console.log("Before clean model", r);
        //Primary list is always at index 0
        //Set model in the service first for use in V2 future forms
        //adds listId to the key to make it unique to a list in case of multi lists
        this.vs.setModel(r, this.view.form.lists[0]);
        // this.model = this.vs.getModel(this.view.form.lists[0]);
        this.model = this.vs.getModel();
        console.log("model : ", this.model);
        // this.fields = this.formlyService.getFormlySchema(
        //   this.view.form.components
        // );

        this.formLoaded = true;
        this.vs.formData = this.view.form;
        this.vs.addForm(this.form);

      }, e => {
        this.toastr.error(e, 'Error', { closeButton: true });
      });
  }

  isDocumentList(listId) {
    if (this.view.form.lists) {
      return this.view.form.lists.find(l => l.listId == listId).baseType == 1;
    }
    return false;
  }

  submit(model) {
    this.vs.submit(model, this.view.form.lists[0].baseType, this.view.item.RefId);
    this.vs.isFormValid$
      .pipe(takeWhile(() => this.alive))
      .subscribe(res => {
        if (res) {
          this.options.formState.disabled = true;
        }
      });
  }

  editPressed(e) {
    this.options.formState.disabled = false;
    this.vs.editPressed();

    e.preventDefault();
  }

  print() {
    this.vs.print();
  }

  back() {
    this.vs.back();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
