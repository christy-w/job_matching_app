import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { CandidateProfilePage } from './candidate-profile';

import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    CandidateProfilePage
  ],
  imports: [
    ComponentsModule,
    StarRatingModule,
    IonicPageModule.forChild(CandidateProfilePage),
    TranslateModule.forChild()
  ]
})
export class CandidateProfilePageModule {}