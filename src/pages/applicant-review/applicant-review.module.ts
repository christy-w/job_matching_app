import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { ApplicantReviewPage } from './applicant-review';

import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    ApplicantReviewPage
  ],
  imports: [
    ComponentsModule,
    StarRatingModule,
    IonicPageModule.forChild(ApplicantReviewPage),
    TranslateModule.forChild()
  ]
})
export class ApplicantReviewPageModule {}