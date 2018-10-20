import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { ApplicantHomePage } from './applicant-home';

@NgModule({
  declarations: [
    ApplicantHomePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ApplicantHomePage),
    TranslateModule.forChild()
  ]
})
export class ApplicantHomePageModule {}