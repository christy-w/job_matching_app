// Ionic / Angular / 3rd-party dependencies
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// Custom dependencies
import { MyApp } from './app.component';
import { MyNavbar } from '../components/my-navbar/my-navbar';
import { HomePage } from '../pages/home/home';
import { NewVersionPage } from '../pages/new-version/new-version';
import { Utils } from '../core/providers/utils';
import { ApiService } from '../providers/api-service/api-service';

export const myComponents = [
	// pages
	HomePage,
	NewVersionPage,
	// components
	MyNavbar 
];

export const myDirectives = [
];

export const myPipes = [
];

export const myProviders = [
	Utils,
	ApiService
]

export function createTranslateLoader(http: Http) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		MyApp,
		...myComponents,
		...myDirectives,
		...myPipes
	],
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		IonicModule.forRoot(MyApp, {
			prodMode: false,
			tabsPlacement: 'bottom'
		}),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [Http]
			}
		})
	],
	exports: [TranslateModule],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		...myComponents
	],
	providers: [
		Storage,
		...myProviders,
	
		// Here we tell the Angular ErrorHandling class
		// that it should be using the IonicErrorHandler class for any errors
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }