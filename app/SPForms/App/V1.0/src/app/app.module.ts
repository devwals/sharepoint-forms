import { NgxPaginationModule } from 'ngx-pagination';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Inject, NgModule, ApplicationRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppComponentViewer } from './app.component.viewer';
import { ViewerModule } from './viewer/viewer.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent, 
    AppComponentViewer
  ],
  imports: [    
    ViewerModule,
    BrowserModule,
    PagesModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule, 
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ToastrModule.forRoot()
  ],
  entryComponents: [
    AppComponent, AppComponentViewer
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }
  ]
})
export class AppModule {
  private browser_document;
  ngDoBootstrap(appRef:ApplicationRef){
    if(this.browser_document.getElementsByTagName('ngx-app').length > 0){appRef.bootstrap(AppComponent);}
    if(this.browser_document.getElementsByTagName('ngx-viewer').length > 0){appRef.bootstrap(AppComponentViewer);}
  }
  constructor(@Inject(DOCUMENT) private document: any){
    this.browser_document = document;
  }
}
