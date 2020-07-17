import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ThemeModule } from '../../@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RoadmapComponent} from './roadmap.component';

@NgModule({
  imports: [
    CommonModule,
    NgxJsonViewerModule,
    SharedModule,
    CommonModule,
    ThemeModule,
    NgbModule.forRoot()
  ],
  declarations: [RoadmapComponent],
  entryComponents: [RoadmapComponent]
})
export class RoadmapModule { }
