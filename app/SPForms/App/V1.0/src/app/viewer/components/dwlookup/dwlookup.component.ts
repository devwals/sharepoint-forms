import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged, take, takeUntil, takeWhile } from 'rxjs/operators';
import { SPDataService } from '../../../services/sp-data.service';
import { fromEvent } from 'rxjs';
import { ViewerService } from '../../../services/viewer.service';

@Component({
  selector: 'dwlookup',
  templateUrl: './dwlookup.component.html',
  styleUrls: ['./dwlookup.component.scss'],
  host: {
    '[class.d-inline-flex]': 'to.addonLeft || to.addonRight',
    '[class.custom-file]': 'to.addonLeft || to.addonRight',
  },
})
export class DWLookupComponent extends FieldType implements OnInit, OnDestroy {
  values: any[] = [];
  results: any[] = [];
  onDestroy$ = new Subject<void>();
  fieldOptions: any;
  valueDeleted = false;
  idField = "";

  @ViewChild('searchBox') t: ElementRef;
  private documentClickObservable = fromEvent(document, 'click');

  constructor(
    private ds: SPDataService,
    private vs: ViewerService
  ) {
    super();
  }

  ngOnInit() {
    this.fieldOptions = this.field.templateOptions.originalFieldOptions;
    this.idField = `${this.field.templateOptions.originalFieldOptions.listId}#${this.field.templateOptions.originalFieldOptions.field}Id`;

    this.getDefaultValues().pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(r => {
      if (r.length > 0) {
        for (let index = 0; index < r.length; index++) {
          const element = r[index];
          this.setSelected(element);
        }
      } else {
        this.setModelValue(null);
      }
    });

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
        return this.ds.getLookupItemsByField(
          this.field.templateOptions.originalFieldOptions.lookupList,
          this.field.templateOptions.originalFieldOptions.lookupField,
          term);
      })
    )
  }

  getDefaultValues() {
    // const idField = `${this.field.templateOptions.originalFieldOptions.field}Id`;
    let filter = "";
    if (this.model && this.model[this.idField] != null && this.model[this.idField] != undefined) {
      if (this.field.templateOptions.originalFieldOptions.allowMultipleValues) {
        for (let index = 0; index < this.model[this.idField].length; index++) {
          const element = this.model[this.idField][index];
          filter += filter.length == 0 ? `ID eq ${element}` : ` or ID eq ${element}`;
        }
      } else if (this.model[this.idField] != "") {
        filter += `ID eq ${this.model[this.idField]}`;
      }
    }

    if (filter.length > 0) {
      return this.ds.getItemsByFilter(
        this.field.templateOptions.originalFieldOptions.lookupList,
        filter);
    } else {
      return of([]);
    }
  }

  formatter = (x: any) => x[`${this.field.templateOptions.originalFieldOptions.lookupField}`];

  selectedItem(e) {
    this.setSelected(e.item);
    e.preventDefault();
  }

  setSelected(value) {
    const field = this.field.templateOptions.originalFieldOptions.lookupField
    const item = {
      ID: value.ID,
      DisplayText: value[field]
    };

    if (this.field.templateOptions.originalFieldOptions.allowMultipleValues) {
      let found = this.values.some(function (obj) {
        return obj.ID === item.ID;
      })

      if (!found) { this.values.push(item); }

      // this.values.push(item);
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

    //TODO: validate this control
  }

  setModelValue(item) {
    // const idField = `${this.field.templateOptions.originalFieldOptions.field}Id`;

    if (this.field.templateOptions.originalFieldOptions.allowMultipleValues) {
      this.model[this.idField] = { results: this.values.map(v => v.ID) }
    } else {
      this.model[this.idField] = item ? item.ID : null;
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
