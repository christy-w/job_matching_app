import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { ApplicantProfilePage } from './applicant-profile';

@NgModule({
  declarations: [
    ApplicantProfilePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ApplicantProfilePage),
    TranslateModule.forChild()
  ]
})
export class ApplicantProfilePageModule {}