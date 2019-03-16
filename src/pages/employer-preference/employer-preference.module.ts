import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { EmployerPreferencePage } from './employer-preference';

@NgModule({
  declarations: [
    EmployerPreferencePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EmployerPreferencePage),
    TranslateModule.forChild()
  ]
})
export class EmployerPreferencePageModule {}