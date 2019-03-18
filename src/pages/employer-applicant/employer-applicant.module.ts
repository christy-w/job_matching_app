import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { EmployerApplicantPage } from './employer-applicant';

import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    EmployerApplicantPage
  ],
  imports: [
    ComponentsModule,
    StarRatingModule,
    IonicPageModule.forChild(EmployerApplicantPage),
    TranslateModule.forChild()
  ]
})
export class EmployerApplicantPageModule {}