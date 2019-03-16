import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { EmployerProfileDetailPage } from './employer-profile-detail';

@NgModule({
  declarations: [
    EmployerProfileDetailPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EmployerProfileDetailPage),
    TranslateModule.forChild()
  ]
})
export class EmployerProfileDetailPageModule {}