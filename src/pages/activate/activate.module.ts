import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { ActivatePage } from './activate';
@NgModule({
  declarations: [
    ActivatePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ActivatePage),
    TranslateModule.forChild()
  ]
})
export class ActivatePageModule {}