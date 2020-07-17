
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SPDataService } from '../../services/sp-data.service';

let counter = 0;

@Injectable()
export class UserService {

  private users = {
    nick: { name: 'Nick Jones', picture: '../app/dist/assets/images/nick.png' },
    eva: { name: 'Eva Moor', picture: '../app/dist/assets/images/eva.png' },
    jack: { name: 'Jack Williams', picture: '../app/dist/assets/images/jack.png' },
    lee: { name: 'Lee Wong', picture: '../app/dist/assets/images/lee.png' },
    alan: { name: 'Alan Thompson', picture: '../app/dist/assets/images/alan.png' },
    kate: { name: 'Kate Martinez', picture: '../app/dist/assets/images/kate.png' },
  };

  private userArray: any[];

  constructor(private spService: SPDataService) {
    // this.userArray = Object.values(this.users);
  }

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getUserArray(): Observable<any[]> {
    return observableOf(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return observableOf(this.userArray[counter]);
  }

  getCurrentUser(): Promise<any>{
    return new Promise((resolve,reject) =>{
      this.spService.loadSP().then(() => {
        
        this.spService.cdWeb().currentUser.get().then(u=>{
          resolve(u);
          // this.spService.context.profiles.getUserProfilePropertyFor(u.LoginName,"Title").then(r=>{
          //    console.log(r);
          // });
        });

        

      }).catch(reason=>{
        reject(reason);
      });
    });
  }
}
