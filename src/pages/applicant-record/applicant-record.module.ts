import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { ApplicantRecordPage } from './applicant-record';

@NgModule({
  declarations: [
    ApplicantRecordPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ApplicantRecordPage),
    TranslateModule.forChild()
  ]
})
export class ApplicantRecordPageModule {}