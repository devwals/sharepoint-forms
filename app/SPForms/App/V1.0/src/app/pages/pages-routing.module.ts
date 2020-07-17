import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListsComponent } from './lists/lists.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { RoadmapComponent } from './roadmap/roadmap.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'lists',
      component: ListsComponent
    },
    {
      path: 'libraries',
      component: LibrariesComponent,
    },
    {
      path: 'roadmap',
      component: RoadmapComponent
    },
    {
      path: 'forms',
      loadChildren: 'app/pages/forms/forms.module#FormsModule'
    },
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
export class PagesRoutingModule {
}
