import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { EmployerHomePage } from './employer-home';

@NgModule({
  declarations: [
    EmployerHomePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EmployerHomePage),
    TranslateModule.forChild()
  ]
})
export class EmployerHomePageModule {}