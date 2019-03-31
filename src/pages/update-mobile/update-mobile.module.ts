import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { UpdateMobilePage } from './update-mobile';
@NgModule({
  declarations: [
    UpdateMobilePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(UpdateMobilePage),
    TranslateModule.forChild()
  ]
})
export class UpdateMobilePageModule {}