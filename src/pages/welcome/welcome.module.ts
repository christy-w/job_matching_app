import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { WelcomePage } from './welcome';
@NgModule({
  declarations: [
    WelcomePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(WelcomePage),
    TranslateModule.forChild()
  ]
})
export class WelcomePageModule {}