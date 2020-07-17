import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ListsModule } from './lists/lists.module';
import { LibrariesModule } from './libraries/libraries.module';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { RoadmapModule } from './roadmap/roadmap.module';

const PAGES_COMPONENTS = [
  PagesComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ListsModule,
    LibrariesModule,
    RoadmapModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
