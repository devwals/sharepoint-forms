import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsComponent } from './forms.component';
import { CreateComponent } from './create/create.component';
import { BuilderComponent } from './builder/builder.component';

const routes: Routes = [{
  path: '',
  component: FormsComponent,
  children: [
    {
      path: 'create',
      component: CreateComponent,
    },
    {
      path: 'edit/:id',
      component: BuilderComponent,
    },
    // {
    //   path: 'view/:id',
    //   component: DWFormViewComponent,
    // },
    // {
    //   path: 'preview/:id',
    //   component: DWFormViewComponent,
    // },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class FormsRoutingModule {
}
