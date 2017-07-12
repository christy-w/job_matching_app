import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild()
  ]
})
export class HomePageModule {}