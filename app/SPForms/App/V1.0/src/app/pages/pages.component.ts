import { Component, ApplicationRef } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;
  constructor(
    private _applicationRef: ApplicationRef, 
    private _router: Router){
    
  }
}
