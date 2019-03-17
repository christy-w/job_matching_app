import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { EmployerRecommendationPage } from './employer-recommendation';

@NgModule({
  declarations: [
    EmployerRecommendationPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EmployerRecommendationPage),
    TranslateModule.forChild()
  ]
})
export class EmployerRecommendationPageModule {}