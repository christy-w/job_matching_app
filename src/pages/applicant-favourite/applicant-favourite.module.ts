import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { ApplicantFavouritePage } from './applicant-favourite';

@NgModule({
  declarations: [
    ApplicantFavouritePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ApplicantFavouritePage),
    TranslateModule.forChild()
  ]
})
export class ApplicantFavouritePageModule {}