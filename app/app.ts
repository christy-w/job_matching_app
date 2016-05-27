// Angular, Ionic, third-party libraries
import {provide} from '@angular/core';
import {Http} from '@angular/http';
import {App, Platform} from 'ionic-angular';
import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

// JuicyLauncher 2 core files & providers
import {BaseApp} from './core/BaseApp';
import {Config} from './providers/config';
import {LanguageSelector} from './core/providers/language-selector';
import {LocalData} from './core/providers/local-data';

// App pages
import {HomePage} from './pages/home/home';

@App({
	templateUrl: 'build/app.html',
	config: {
		// http://ionicframework.com/docs/v2/api/config/Config/
	},
	prodMode: false,
	pipes: [],
	providers: [
		// Providers for global use
		Config,
		LanguageSelector,
		LocalData,
		
		// Multilingual setup (https://github.com/ocombe/ng2-translate)
		provide(TranslateLoader, {
			useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
			deps: [Http]
		}),
		TranslateService
	]
})
class MyApp extends BaseApp {
	
	constructor(
		platform: Platform,
		config: Config,
		translate: TranslateService
	) {
		super(platform);
		console.log('MyApp constructor');
		
		// to avoid flickering effect while obtaining saved language from local 
		translate.setDefaultLang(config.DEFAULT_LANGUAGE);
		translate.use(config.DEFAULT_LANGUAGE);
	}
	
	// override parent
	protected onAppLoaded() {
		// redirect page only when everything is setup
		console.log('MyApp onAppLoaded');
		this.rootPage = HomePage;
	}
}
