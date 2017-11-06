// Ionic / Angular / 3rd-party dependencies
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Network } from '@ionic-native/network';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { OneSignal } from '@ionic-native/onesignal';

// Core dependencies
import { MyApp } from './app.component';
import { NewVersionPage } from '../core/components/new-version/new-version';
import { Utils } from '../core/providers/utils';
import { Api } from '../providers';
import { EscapeHtml } from '../core/pipes/escape-html';
import { InappHref } from '../core/components/inapp-href/inapp-href';

/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = [
	MyApp
];

let components = [
	NewVersionPage
];

let directives = [
	InappHref
];

let pipes = [
	EscapeHtml
];

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function declarations() {
	return [pages, ...components, ...directives, ...pipes];
}

export function entryComponents() {
	return [pages, ...components];
}

export function providers() {
	return [
		// Ionic Native
		StatusBar,
		SplashScreen,
		AppVersion,
		GoogleAnalytics,
		Network,
		ThemeableBrowser,
		OneSignal,

		// Custom
		Api,
		Utils,

		// Here we tell the Angular ErrorHandling class
		// that it should be using the IonicErrorHandler class for any errors
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	];
}

@NgModule({
	declarations: declarations(),
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp, {
			prodMode: false,
			tabsPlacement: 'bottom'
		}),
		IonicStorageModule.forRoot(),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	bootstrap: [IonicApp],
	entryComponents: entryComponents(),
	providers: providers()
})
export class AppModule { }