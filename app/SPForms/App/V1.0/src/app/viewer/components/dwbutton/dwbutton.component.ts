import { ViewerService } from './../../../services/viewer.service';
import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'dwbutton',
  templateUrl: './dwbutton.component.html',
  styleUrls: ['./dwbutton.component.scss'],
  host: {
    '[class.d-inline-flex]': 'to.addonLeft || to.addonRight',
    '[class.custom-file]': 'to.addonLeft || to.addonRight',
  }
})
export class DwbuttonComponent extends FieldType implements OnInit {

  fieldOptions: any;
  buttonType: any;
  alive = true;
  validForm = false;
  formEnabled = true;

  get type() {
    return this.to.type || 'text';
  }

  constructor(private vs: ViewerService) { 
    super();
  }

  ngOnInit() { 
    console.log("model from button : ", this.model);
    this.fieldOptions = this.field.templateOptions.originalFieldOptions;
    this.buttonType = this.fieldOptions.buttonType;
    console.log(this.buttonType);
  }

  buttonPressed() {
    console.log(this.model);
    
    if(this.buttonType == 'save') {
      // this.vs.submit(this.model);
      this.vs.setFormAction('save');

      // this.vs.submit(this.model);
      this.vs.isFormValid$
        .pipe(takeWhile(() => this.alive))
        .subscribe(res => {
          if(res) {
            this.validForm = true;
          }
        });

      this.vs.formState$
        .pipe(takeWhile(() => this.alive))
        .subscribe(res => {
          this.formEnabled = res;
          console.log(res);
      });

    } else if(this.buttonType == 'print') {
      this.vs.print();
    } else {
      this.vs.back();
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
