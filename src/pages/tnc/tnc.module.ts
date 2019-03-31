import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { TncPage } from './tnc';
@NgModule({
  declarations: [
    TncPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TncPage),
    TranslateModule.forChild()
  ]
})
export class TncPageModule {}