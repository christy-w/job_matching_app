// Ionic / Angular / 3rd-party dependencies
import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig } from 'ionic-angular';

// Core dependencies
import { MyApp } from './app.component';
import { CommonHeader } from '../components/common-header/common-header';
import { CommonFooter } from '../components/common-footer/common-footer';
import { NewVersionPage } from '../core/components/new-version/new-version';
import { Utils } from '../core/providers/utils';
import { ApiService } from '../providers/api-service/api-service';
import { EscapeHtml } from '../core/pipes/escape-html';
import { InappHref } from '../core/components/inapp-href/inapp-href';

// Pages
import { HomePage } from '../pages/home/home';

/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = [
	MyApp,
	HomePage
];

let components = [
	CommonHeader,
	CommonFooter,
	NewVersionPage
];

let directives = [
	InappHref
];

let pipes = [
	EscapeHtml
];

// http://ionicframework.com/docs/v2/api/navigation/DeepLinker/
let deeplink_config: DeepLinkConfig = {
	links: [
		{ component: HomePage, name: 'Home', segment: 'home' },
	]
};

export function createTranslateLoader(http: Http) {
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
		ApiService,
		Utils,
		
		// Here we tell the Angular ErrorHandling class
		// that it should be using the IonicErrorHandler class for any errors
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	];
}

@NgModule({
	declarations: declarations(),
	imports: [
		FormsModule,
		IonicModule.forRoot(MyApp, {
			prodMode: false,
			tabsPlacement: 'bottom'
		}, deeplink_config),
		IonicStorageModule.forRoot(),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [Http]
			}
		})
	],
	bootstrap: [IonicApp],
	entryComponents: entryComponents(),
	providers: providers()
})
export class AppModule { }