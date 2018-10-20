import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { ApplicantRecommendationPage } from './applicant-recommendation';

@NgModule({
  declarations: [
    ApplicantRecommendationPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ApplicantRecommendationPage),
    TranslateModule.forChild()
  ]
})
export class ApplicantRecommendationPageModule {}