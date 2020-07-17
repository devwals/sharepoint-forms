import { Injectable } from '@angular/core';
import { IInstallService } from './interfaces/iinstall-service';
import { SPDataService } from './sp-data.service';

@Injectable({
  providedIn: 'root'
})
export class SPInstallService implements IInstallService {
  constructor(private ds: SPDataService) {
  }

  getFormStores() {
    return new Promise((resolve, reject) => {
      this.ds.loadSP().then(r => {
        this.ds.cdWeb().lists.getByTitle("Devwals Forms").items.get().then((r1) => {
          resolve(r1);
        },
          (e1) => {
            reject(e1);
          });
      }, (e) => {
        reject(e);
      });
    });
  }
  
  createFormStores() {
    return new Promise((resolve, reject) => {

      this.ds.loadSP().then(r => {
        this.ds.cdWeb().lists.add("Devwals Forms", "", 101).then((r1) => {
          Promise.all([
            r1.list.fields.add("RefId","SP.FieldText", {FieldTypeKind: 2}),
            r1.list.fields.add("RefName","SP.FieldText", {FieldTypeKind: 2})
          ]).then(r3=>{
            resolve(r1);
          }); 
        },
          (e1) => {
            reject(e1);
          });
      }, (e) => {
        reject(e);
      });
    });
  }
}
