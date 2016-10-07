// Ionic / Angular / 3rd-party dependencies
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

// Custom dependencies
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

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: components,
  imports: [
    IonicModule.forRoot(MyApp, {
      prodMode: false,
      tabsPlacement: 'bottom'
    }),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  exports: [TranslateModule],
  bootstrap: [IonicApp],
  entryComponents: components,
  providers: [Utils, ApiService]
})
export class AppModule {}