import { Component, OnInit, OnDestroy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { SPDataService } from '../../../services/sp-data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'dwdocument-upload',
  templateUrl: './dwdocument-upload.component.html',
  styleUrls: ['./dwdocument-upload.component.scss']
})
export class DWDocumentUploadComponent extends FieldType implements OnInit, OnDestroy {

  documentToUpload: File;
  document: any;
  onDestroy$ = new Subject<void>();

  constructor(
    private ds: SPDataService
  ) {
    super();
  }

  ngOnInit() {
    this.document = this.model[`${this.field.templateOptions.originalFieldOptions.listId}#File`];
  }

  onFileChanged(event) {
    if(event.target.files.length > 0){
      this.documentToUpload = <File>event.target.files[0];
    }
    this.setModel();
  }

  setModel(){
    this.model[`${this.field.templateOptions.originalFieldOptions.listId}#documentToUpload`] = {
      file: this.documentToUpload, 
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

