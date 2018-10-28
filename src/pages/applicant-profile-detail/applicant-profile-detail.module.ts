import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { ApplicantProfileDetailPage } from './applicant-profile-detail';

@NgModule({
  declarations: [
    ApplicantProfileDetailPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ApplicantProfileDetailPage),
    TranslateModule.forChild()
  ]
})
export class ApplicantProfileDetailPageModule {}