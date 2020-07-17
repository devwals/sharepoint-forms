import { Component, OnInit, OnDestroy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { SPDataService } from '../../../services/sp-data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ViewerService } from '../../../services/viewer.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'dwattach-file',
  templateUrl: './dwattach-file.component.html',
  styleUrls: ['./dwattach-file.component.scss'],
})
export class DWAttachFileComponent extends FieldType implements OnInit, OnDestroy {

  attachmentFiles: any = [];
  attachmentsToDelete: any = [];
  attachmentsToUpload: any = [];
  onDestroy$ = new Subject<void>();
  isNewForm: boolean = true;

  constructor(
    private ds: SPDataService,
    private vs: ViewerService
  ) {
    super();
  }

  ngOnInit() {
    this.model.ItemAttachments = {
      ToAttach: this.attachmentsToUpload, 
      ToDelete: this.attachmentsToDelete
    }
    
    if (this.vs.getMode() != "preview" && !this.vs.isNewMode()) {
      this.getInitData();
      this.isNewForm = false;
    }

    this.vs.version$
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(v=>{
      if(v > 1) {
        this.getInitData();
      }
    });
  }

  //PnP doc for the attachments
  getInitData() {
    //Reset data on every initilization
    this.attachmentsToDelete = [];
    this.attachmentsToUpload = [];
    this.formControl.reset();
    this.setModel();
    
    this.ds.getItemAttachments(
      this.field.templateOptions.originalFieldOptions.listId,
      this.model[`${this.field.templateOptions.originalFieldOptions.listId}#Id`] 
      || this.model[`${this.field.templateOptions.originalFieldOptions.listId}#ID`]
    ).pipe(takeUntil(this.onDestroy$))
      .subscribe(v => {
        this.attachmentFiles = v;
        
      if(this.attachmentFiles.length != 0) {
        this.formControl.clearValidators();
        this.formControl.updateValueAndValidity();
        console.log("clear validators")
      } else {
        this.formControl.setValidators([Validators.required]);
        this.formControl.updateValueAndValidity();
        console.log("no data ")
      }
        console.log(this.formControl.errors);
      });
  }

  onFileChanged(event) {
    const selectedFiles = <File[]>event.target.files;
    this.attachmentsToUpload = [];

    for (let index = 0; index < selectedFiles.length; index++) {
      const file = selectedFiles[index];
      this.attachmentsToUpload.push(
        {
          name: file.name,
          content: file
        }
      );
    }

    this.setModel();
  }

  remove(e, item) {
    for (let index = 0; index < this.attachmentFiles.length; index++) {
      const element = this.attachmentFiles[index];
      if (item == element) {
        this.attachmentsToDelete.push({
          name: item.FileName
        });
        this.attachmentFiles.splice(index, 1);
      }
    }

    if(this.attachmentFiles.length != 0) {
      this.formControl.clearValidators();
      this.formControl.updateValueAndValidity();
      console.log("clear validators")
    } else {
      this.formControl.setValidators([Validators.required]);
      this.formControl.updateValueAndValidity();
      console.log("no data ")
    }
 
    // console.log(...this.attachmentFiles.map(f=>f.FileName))
    this.formControl.markAsTouched();
    this.setModel();
  }

  removeFileToUpload(e, item) {
    for (let index = 0; index < this.attachmentsToUpload.length; index++) {
      const element = this.attachmentsToUpload[index];
      if (item == element) {
        this.attachmentsToUpload.splice(index, 1);

        if(this.attachmentsToUpload.length == 0) {
          console.log("last file");
          this.formControl.reset();
          this.formControl.markAsTouched();
        }
      }
    }

    this.setModel();
  }

  setModel() {
    this.model.ItemAttachments = {
      ToAttach: this.attachmentsToUpload, 
      ToDelete: this.attachmentsToDelete
    }

    console.log(this.model.ItemAttachments);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
