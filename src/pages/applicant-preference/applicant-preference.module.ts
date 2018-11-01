import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { ApplicantPreferencePage } from './applicant-preference';

@NgModule({
  declarations: [
    ApplicantPreferencePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ApplicantPreferencePage),
    TranslateModule.forChild()
  ]
})
export class ApplicantPreferencePageModule {}