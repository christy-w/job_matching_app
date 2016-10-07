import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { MyNavbar } from '../components/my-navbar/my-navbar';
import { HomePage } from '../pages/home/home';
import { NewVersionPage } from '../pages/new-version/new-version';
import { Utils } from '../core/providers/utils';
import { ApiService } from '../providers/api-service/api-service';

// array for declarations and entryComponents
let components = [
  MyApp,

  // pages
  HomePage,
  NewVersionPage,

  // custom components
  MyNavbar
];

// App config
let configObject = {
  prodMode: false,
  tabsPlacement: 'bottom'
};

@NgModule({
  declarations: components,
  imports: [
    IonicModule.forRoot(MyApp, {configObject})
  ],
  bootstrap: [IonicApp],
  entryComponents: components,
  providers: [Utils, ApiService]
})
export class AppModule {}