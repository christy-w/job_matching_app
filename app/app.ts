import {BaseApp} from './core/BaseApp';
import {provide} from '@angular/core';
import {Http} from '@angular/http';
import {App, Platform} from 'ionic-angular';
import {HomePage} from './pages/home/home';
import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

@App({
	template: `<ion-nav [root]="mRootPage"></ion-nav>`,
	config: {
		// http://ionicframework.com/docs/v2/api/config/Config/
	},
	prodMode: false,
	pipes: [],
	providers: [
		// https://github.com/ocombe/ng2-translate
		provide(TranslateLoader, {
			useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
			deps: [Http]
		}),
		TranslateService
	],
})
export class MyApp extends BaseApp {

	protected mRootPage = HomePage;
	
	constructor(platform: Platform, translate: TranslateService) {
		super(platform, translate);
	}
}
