import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { ResetPasswordPage } from './reset-password';
@NgModule({
  declarations: [
    ResetPasswordPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ResetPasswordPage),
    TranslateModule.forChild()
  ]
})
export class ResetPasswordPageModule {}