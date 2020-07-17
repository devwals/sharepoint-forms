import { ViewerService } from './../../../services/viewer.service';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable, from, of, Subject, forkJoin } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { SPDataService } from '../../../services/sp-data.service';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/merge';
import { fromEvent } from 'rxjs';
import { sanitizeGuid } from '@pnp/common';
import { taxonomy, setItemMetaDataMultiField } from "@pnp/sp-taxonomy";

@Component({
  selector: 'dwmanaged-metadata',
  templateUrl: './dwmanaged-metadata.component.html',
  styleUrls: ['./dwmanaged-metadata.component.scss'],
  host: {
    // '(document:click)': 'onDocumentClick($event)',
  }
})
export class DWManagedMetadataComponent extends FieldType implements OnInit, OnDestroy {
  values: any[] = [];
  results: any[] = [];
  associatedField: string;
  fieldOptions: any;
  valueDeleted = false;

  onDestroy$ = new Subject<void>();

  @ViewChild('searchBox') t: ElementRef;
  private documentClickObservable = fromEvent(document, 'click');

  constructor(
    private ds: SPDataService,
    private toastr: ToastrService,
    private vs: ViewerService
  ) {
    super();
  }

  ngOnInit() {

    // console.log("getFormAction : ", this.vs.getFormAction().source["value"]);

    this.fieldOptions = this.field.templateOptions.originalFieldOptions;
    this.setInitialValues();

    this.documentClickObservable.pipe(takeUntil(this.onDestroy$))
      .subscribe(v => {
        if (this.t) {
          if (this.t.nativeElement && event.target !== this.t.nativeElement) {
            this.t.nativeElement.value = "";
            let tAheads = document.getElementsByTagName('ngb-typeahead-window');
            for (let index = 0; index < tAheads.length; index++) {
              const element = tAheads[index];
              element["style"]["visibility"] = "hidden";
            }
          }
        }
      });
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => {
        return this.ds.getTermSetItems(this.field.templateOptions.originalFieldOptions.sspId,
          this.field.templateOptions.originalFieldOptions.termSetId,
          term);
        // return this.ds.getLookupItemsByField(
        //   this.field.templateOptions.originalFieldOptions.lookupList,
        //   "Title",
        //   term);
      })
    )
  }

  setInitialValues(): void {
    forkJoin(
      this.getListFields(),
      this.getInitValues()
    )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(v => {
        const fields = v[0];
        const initValues = v[1];

        if (this.field.templateOptions.originalFieldOptions.allowMultipleValues) {
          const spField = fields.find(f => f.InternalName == this.field.templateOptions.originalFieldOptions.field);
          this.associatedField = fields.find(f => f.Title == `${spField.Title}_0`).InternalName;
        }

        // if (this.model[this.field.templateOptions.originalFieldOptions.field]) {
        if (this.model[this.key]) {
          initValues.forEach(element => {
            this.setModelValue(element);
          });
        }
      }, e => {
        console.log(e);
        this.toastr.error(`${e}`, 'Error', { closeButton: true });
      },
        () => {
          // console.log("Finally");
        });
  }

  formatter = (x: any) => x[`${this.field.templateOptions.originalFieldOptions.lookupField}`];

  getInitValues() {
    let values = [];
    const field = this.field.templateOptions.originalFieldOptions.field;

    // if (this.model && this.model[field]) {
    if (this.model && this.model[this.key]) {
      if (this.field.templateOptions.originalFieldOptions.allowMultipleValues
        && this.model[this.key].length > 0) {
        this.model[this.key].forEach(v => {
          values.push({
            "__metadata": { "type": "SP.Taxonomy.TaxonomyFieldValue" },
            WssId: '-1',
            Label: v.Label,
            TermGuid: v.TermGuid
          });
        });
      } else if (!this.field.templateOptions.originalFieldOptions.allowMultipleValues
        && this.model[this.key]) {

        let filter = `IdForTerm eq '${this.model[this.key].TermGuid}'`;

        this.ds.getItemsByFilter(
          this.field.templateOptions.originalFieldOptions.lookupList,
          filter)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(v => {
            if (v && v.length > 0)
              values.push({
                "__metadata": { "type": "SP.Taxonomy.TaxonomyFieldValue" },
                WssId: '-1',
                Label: v[0].Term,
                TermGuid: v[0].IdForTerm
              });
          });
      }
    }
    this.values = values;
    return of(values);
  }

  getListFields(): Observable<any> {
    return from(this.ds.getListFields(this.field.templateOptions.originalFieldOptions.listId, true));
  }

  selectedItem(e) {
    
    const item = {
      "__metadata": { "type": "SP.Taxonomy.TaxonomyFieldValue" },
      WssId: '-1',
      Label: e.item.Term || e.item.Name,//e.item.Name comes from the sp-taxonomy object
      TermGuid: e.item.IdForTerm || (e.item.Id ? sanitizeGuid(e.item.Id) :undefined) //e.item.Id comes from the sp-taxonomy object
    };

    if (this.field.templateOptions.originalFieldOptions.allowMultipleValues) {

      let found = this.values.some(function (obj) {
        return obj.TermGuid === item.TermGuid;
      })

      if (!found) { this.values.push(item); }
      console.log(this.values);
    } else {
      this.values = [item];
    }

    this.formControl.setValue(this.values);
    this.setModelValue(item);
  }

  remove(e, item) {
    for (let index = 0; index < this.values.length; index++) {
      const element = this.values[index];
      if (item == element) {
        this.values.splice(index, 1);
      }
    }

    this.valueDeleted = true;

    this.formControl.setValue(this.values);
    this.values.length > 0 ? this.setModelValue(this.values[0]) : this.setModelValue(null);
  }

  setModelValue(item?: any) {

    const field = this.field.templateOptions.originalFieldOptions.field;

    if (this.field.templateOptions.originalFieldOptions.allowMultipleValues) {
      let termsString: string = '';
      this.values.map(v => `-1;#${v.Label}|${v.TermGuid};`).join("#");
      this.values.forEach(term => {
        termsString += `-1;#${term.Label}|${term.TermGuid};#`;
      });
      // termsString = "-1;#Chiefly Financial|b12f61c5-87a7-4e20-99d7-4c86f79da599;";
      this.model[this.key] = { associatedField: this.associatedField, values: termsString.length > 0 ? termsString : null };

      // setItemMetaDataMultiField(this.model,this.field.templateOptions.originalFieldOptions.field.key,this.values[0]);

    } else {
      this.model[this.key] = item ? item : null;
    }
  }

  get type() {
    return this.to.type || 'text';
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
