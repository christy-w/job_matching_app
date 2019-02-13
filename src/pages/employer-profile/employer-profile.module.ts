import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { EmployerProfilePage } from './employer-profile';

import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    EmployerProfilePage
  ],
  imports: [
    ComponentsModule,
    StarRatingModule,
    IonicPageModule.forChild(EmployerProfilePage),
    TranslateModule.forChild()
  ]
})
export class EmployerProfilePageModule {}