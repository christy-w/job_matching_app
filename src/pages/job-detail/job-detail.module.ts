import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { JobDetailPage } from './job-detail';

@NgModule({
  declarations: [
    JobDetailPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(JobDetailPage),
    TranslateModule.forChild()
  ]
})
export class JobDetailPageModule {}