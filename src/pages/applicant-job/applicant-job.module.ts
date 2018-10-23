import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { ApplicantJobPage } from './applicant-job';

@NgModule({
  declarations: [
    ApplicantJobPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ApplicantJobPage),
    TranslateModule.forChild()
  ]
})
export class ApplicantJobPageModule {}