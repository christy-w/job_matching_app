import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { LanguagePage } from './language';
@NgModule({
  declarations: [
    LanguagePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(LanguagePage),
    TranslateModule.forChild()
  ]
})
export class LanguagePageModule {}