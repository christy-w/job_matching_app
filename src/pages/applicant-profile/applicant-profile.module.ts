import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { ApplicantProfilePage } from './applicant-profile';

import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    ApplicantProfilePage
  ],
  imports: [
    ComponentsModule,
    StarRatingModule,
    IonicPageModule.forChild(ApplicantProfilePage),
    TranslateModule.forChild()
  ]
})
export class ApplicantProfilePageModule {}