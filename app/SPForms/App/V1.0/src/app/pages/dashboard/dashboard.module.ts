import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ModalDeleteFormComponent } from './modal-delete-form/modal-delete-form.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { DW_FORMLY_CONFIG } from '../../viewer/models/formly-config';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(
      DW_FORMLY_CONFIG
    ),
    FormlyBootstrapModule,
    ThemeModule,
    NgbModule.forRoot(),
    RouterModule,
    NgxPaginationModule
  ],
  declarations: [
    DashboardComponent,
    ModalDeleteFormComponent
  ],
  entryComponents: [
    ModalDeleteFormComponent
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
