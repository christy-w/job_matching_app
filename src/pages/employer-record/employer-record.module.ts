import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { EmployerRecordPage } from './employer-record';

@NgModule({
  declarations: [
    EmployerRecordPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EmployerRecordPage),
    TranslateModule.forChild()
  ]
})
export class EmployerRecordPageModule {}