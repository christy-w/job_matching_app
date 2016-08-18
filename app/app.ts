// Angular, Ionic, third-party libraries
import {Component} from '@angular/core';
import {ionicBootstrap, Platform} from 'ionic-angular';

// JuicyLauncher 2 core files & providers
import {Config} from './providers/config';
import {BaseApp} from './core/BaseApp';
import {LocalData} from './core/providers/local-data';
import {ApiService} from './providers/api-service/api-service';

// App pages
import {HomePage} from './pages/home/home';

@Component({
	templateUrl: 'build/app.html'
})
export class MyApp extends BaseApp {
	
	constructor(platform: Platform) {
		super(platform);
		console.log('MyApp constructor');
	}
	
	// override parent
	protected onAppLoaded() {
		// set rootpage only when the app is ready
		console.log('MyApp onAppLoaded');
		this.rootPage = HomePage;
	}
}

let providers = [Config, LocalData, ApiService];

let config = {
	prodMode: false,
	tabbarPlacement: 'bottom'
};

// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument:
// http://ionicframework.com/docs/v2/api/config/Config/
ionicBootstrap(MyApp, providers, config);