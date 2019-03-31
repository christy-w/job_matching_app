import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { AboutPage } from './about';
@NgModule({
  declarations: [
    AboutPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AboutPage),
    TranslateModule.forChild()
  ]
})
export class AboutPageModule {}