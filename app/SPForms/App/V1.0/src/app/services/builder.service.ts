import { Injectable, OnInit } from '@angular/core';
import { SPFormService } from './sp-form.service';
import { Subject } from 'rxjs';
import { SPDataService } from './sp-data.service';

@Injectable({
  providedIn: 'root'
})
export class BuilderService implements OnInit {

  form: any = {};

  constructor(
    private fs: SPFormService,
    private ds: SPDataService
  ) { }

  ngOnInit() {

  }

  setForm(value) {
    this.form = value;
  }

  getForm() {
    return this.form;
  }

}
