import {BaseApp} from './core/BaseApp';
import {provide, Injector} from '@angular/core';
import {Http} from '@angular/http';
import {App, Events, Platform} from 'ionic-angular';
import {HomePage} from './pages/home/home';
import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

@App({
	templateUrl: 'build/app.html',
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
	]
})
class MyApp extends BaseApp {
	
	constructor(
		events: Events,
		platform: Platform,
		translate: TranslateService
	) {
		super(platform, events, translate);

		// prepare list of pages (e.g. on sidemenu)
		this.appPages = [
			{ title: 'Home', component: HomePage, icon: 'home' }
		];

		// redirect page only when everything is setup		
		platform.ready().then(() => {
			this.rootPage = HomePage;
		});
	}
}
