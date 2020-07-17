import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { EditListFormComponent } from './edit-list-form/edit-list-form.component';
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
  declarations: [ListsComponent, EditListFormComponent],
  entryComponents: [EditListFormComponent]
})
export class ListsModule { }
