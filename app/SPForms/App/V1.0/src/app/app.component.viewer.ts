/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
// import { Formio } from 'formiojs';
// import { CheckMatrixComponent } from './CheckMatrix';


@Component({
  selector: 'ngx-viewer',
  template: `<ngx-viewer-layout>
              <router-outlet name="viewer"></router-outlet>
            </ngx-viewer-layout>`,
})
export class AppComponentViewer {

  constructor(private _applicationRef: ApplicationRef, private _router: Router) {
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
  }
}
