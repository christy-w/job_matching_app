import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { EmployerJobCreatePage } from './employer-job-create';

@NgModule({
  declarations: [
    EmployerJobCreatePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EmployerJobCreatePage),
    TranslateModule.forChild()
  ]
})
export class EmployerJobCreatePageModule {}