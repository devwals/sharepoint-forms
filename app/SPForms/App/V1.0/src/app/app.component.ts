import { SPDataService } from './services/sp-data.service';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, ApplicationRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SPAppDataService } from './services/sp-app-data.service';
// import { Formio } from 'formiojs';
// import { CheckMatrixComponent } from './CheckMatrix';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit{

  constructor(
    private _applicationRef: ApplicationRef,
    private _router: Router,
    private _asd: SPAppDataService,
    private spData: SPDataService
  ) {
    // _router.events.subscribe(ev => {
    //   if (ev instanceof NavigationEnd) {
    //     setTimeout(() => {
    //       _applicationRef.tick()
    //     }, 500);
    //   }
    // });
    _router.events.subscribe(() => {
      this._applicationRef.tick();
      setTimeout(() => {
        this._applicationRef.tick();
      }, 100);
    });

    let output = this.spData.getParameterByName("output", location.href);

    // if(!output || output != 'success') {
    //   window.location.href = 'https://store.devwals.com/#/registration';
    // }
  }

  ngOnInit() {
    this._asd.getDataByKey("Registration").then(r=>{
      if(!r){
        //TODO: Redirect to the user registration page
      }
    });

    //TODO: Check if redirect from the Devwals registration page and call the onRegistration method
  }

  //Call this method if redirect from the registration page
  onRegistration(){
    this._asd.saveData("Registration", "Done").then(r=>{
      //Pop toastr message
      //You are now successfully registered and the form builder features have been enebled.
    },e=>{
      //Pop toastr message saying registration could not be completed
    })
  }

}
