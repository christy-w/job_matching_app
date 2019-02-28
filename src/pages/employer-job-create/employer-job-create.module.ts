import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployerJobCreatePage } from './employer-job-create';

@NgModule({
  declarations: [
    EmployerJobCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(EmployerJobCreatePage),
  ],
})
export class EmployerJobCreatePageModule {}
