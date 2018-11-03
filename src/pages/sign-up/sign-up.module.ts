import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { SignUpPage } from './sign-up';
@NgModule({
  declarations: [
    SignUpPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SignUpPage),
    TranslateModule.forChild()
  ]
})
export class SignUpPageModule {}