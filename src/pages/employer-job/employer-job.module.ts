import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployerJobPage } from './employer-job';

@NgModule({
  declarations: [
    EmployerJobPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployerJobPage),
  ],
})
export class EmployerJobPageModule {}
