import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable, from, of, Subject, fromEvent } from 'rxjs';
import { debounceTime, map, switchMap, distinctUntilChanged, take, takeUntil, takeWhile } from 'rxjs/operators';
import { SPDataService } from '../../../services/sp-data.service';
import { ViewerService } from '../../../services/viewer.service';

@Component({
  selector: 'dwpeople',
  templateUrl: './dwpeople.component.html',
  styleUrls: ['./dwpeople.component.scss']
})
export class DWPeopleComponent extends FieldType implements OnInit, OnDestroy {
  values: any[] = [];
  results: any[] = [];
  onDestroy$ = new Subject<void>();
  fieldOptions: any;
  valueDeleted: boolean = false;
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
    this.idField = `${this.key}Id`;
    this.getInitValues().pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(r => {
      if (r.length > 0) {
        for (let index = 0; index < r.length; index++) {
          const element = r[index];
          this.setModelValue(
            {
              ID: element.ID,
              DisplayText: element.Title
            }
          );
        }
      } 
    });

    this.documentClickObservable.pipe(takeUntil(this.onDestroy$))
    .subscribe(v => {
      if(this.t) {
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
          this.field.templateOptions.originalFieldOptions.lookupField || 'Name',
          term);
      })
    )
  }

  getInitValues() {

    // const idField = `${this.field.templateOptions.originalFieldOptions.field}Id`;
    let filter = "";
    if (this.field.templateOptions.originalFieldOptions.allowMultipleValues
      && this.model[this.idField]) {
      for (let index = 0; index < this.model[this.idField].length; index++) {
        const element = this.model[this.idField][index];
        filter += filter.length == 0 ? `ID eq ${element}` : ` or ID eq ${element}`;
      }
    } else if (this.model[this.idField] != null && this.model[this.idField] != undefined
      && this.model[this.idField] != "") {
      filter += `ID eq ${this.model[this.idField]}`;
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
    const item = {
      ID: e.item.ID,
      DisplayText: e.item.Title
    };

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

    this.setModelValue();//Reset values
    //TODO: validate this control
  }

  setModelValue(item?:any) {

    if(this.field.templateOptions.originalFieldOptions.allowMultipleValues) {
      let found = this.values.some(function(obj) {
        return obj.ID === item.ID;
      })

      if(!found) { item?this.values.push(item):''; }
      
    } else {
      item?this.values = [item]:'';
    }
    
    this.formControl.setValue(this.values);

    // const idField = `${this.field.templateOptions.originalFieldOptions.field}Id`;
    this.field.templateOptions.originalFieldOptions.allowMultipleValues ?
      this.model[this.idField] = { results: this.values.map(v => v.ID) } :
      this.model[this.idField] = item ? item.ID : null;
  }

  get type() {
    return this.to.type || 'text';
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
