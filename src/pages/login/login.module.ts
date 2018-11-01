import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { LoginPage } from './login';
@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(LoginPage),
    TranslateModule.forChild()
  ]
})
export class LoginPageModule {}