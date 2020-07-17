import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import { CreateModule } from './create/create.module';
import { FormsRoutingModule } from './forms-routing.module';
import { EditModule } from './edit/edit.module';
import { BuilderModule } from './builder/builder.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CreateModule,
    FormsRoutingModule,
    EditModule,
    BuilderModule,
    SharedModule
  ],
  declarations: [FormsComponent]
})
export class FormsModule { }
