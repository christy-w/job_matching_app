// Angular, Ionic, third-party libraries
import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {ionicBootstrap, Platform} from 'ionic-angular';

// JuicyLauncher 2 core files & providers
import {Config} from './providers/config';
import {BaseApp} from './core/BaseApp';
import {Utils} from './core/providers/utils';
import {LocalData} from './core/providers/local-data';
import {ApiService} from './providers/api-service/api-service';

// App pages
import {HomePage} from './pages/home/home';

@Component({
	templateUrl: 'build/app.html'
})
export class MyApp extends BaseApp {
	
	constructor(platform: Platform, api: ApiService, utils: Utils) {
		super(platform, api, utils);
		console.log('MyApp constructor');
	}
	
	// override parent
	protected onAppLoaded() {
		// set rootpage only when the app is ready
		console.log('MyApp onAppLoaded');
		this.rootPage = HomePage;
	}
}

// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument:
// http://ionicframework.com/docs/v2/api/config/Config/
ionicBootstrap(MyApp, [
	// NG2-translate providers
	{
		provide: TranslateLoader,
		useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
		deps: [Http]
	},
	TranslateService,

	// Custom providers
	Config, Utils, LocalData, ApiService
], {
	// App config
	prodMode: false,
	tabsPlacement: 'bottom'
});