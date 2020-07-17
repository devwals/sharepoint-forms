import { Injectable } from '@angular/core';
import { sp } from "@pnp/sp";
import { from, Observable } from 'rxjs';


declare var SP: any;//Fix for error TS2304: Cannot find name 'SP'
@Injectable({
  providedIn: 'root'
})

export class SPAppDataService {
  dataListName = "StoreData";

  getDataByID(id) {
    return from(
      sp.web.lists.getByTitle(this.dataListName).items.getById(id).get()
    );
  }

  getDataByKey(key){
    return new Promise((resolve, reject) => {
      sp.web.lists.getByTitle(this.dataListName).items.filter(`Title eq '${key}'`).get().then(r => {
        if (r && r.length > 0) {
          resolve(r[0]);
        } else {
          resolve(null);
        }
      },e=>{
        reject(e);
      });
    });
  }

  addData(key, value) {
    return from(
      sp.web.lists.getByTitle(this.dataListName).items.add({ Title: key, Value: value })
    );
  }

  saveData(key, value) {
    return new Promise((resolve, reject) => {
      sp.web.lists.getByTitle(this.dataListName).items.filter(`Title eq '${value}'`).get().then(r => {
        if (r && r.length > 0) {
          sp.web.lists.getByTitle(this.dataListName).items.getById(r[0].ID).update(
            { Title: key, Value: value }
          ).then(r1 => {
            resolve()
          },e=>{
            reject(e);
          });

        } else {
          this.addData(key, value).toPromise().then(r1 => {
            resolve(r1);
          },e=>{
            reject(e);
          });
        }
      },e=>{
        reject(e);
      });
    });
  }

}
