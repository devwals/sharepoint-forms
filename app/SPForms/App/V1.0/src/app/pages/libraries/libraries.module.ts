import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrariesComponent } from './libraries.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ThemeModule } from '../../@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgxJsonViewerModule,
    SharedModule,
    CommonModule,
    ThemeModule,
    NgbModule.forRoot()
  ],
  declarations: [LibrariesComponent]
})
export class LibrariesModule { }
