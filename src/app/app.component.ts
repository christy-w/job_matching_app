
// Angular, Ionic, third-party libraries
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { BaseApp } from '../core/base-app';
import { Config } from '../config';
import { Utils } from '../core/providers/utils';
import { ApiService } from '../providers/api-service/api-service';
import { HomePage } from '../pages/home/home';

@Component({
	template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp extends BaseApp {
  
	constructor(platform: Platform, api: ApiService, utils: Utils) {
		super(platform, api, utils);
		Config.DEBUG_VERBOSE && console.log('MyApp constructor');
	}

	// override parent
	protected onAppLoaded() {
		// set rootpage only when the app is ready
		Config.DEBUG_VERBOSE && console.log('MyApp onAppLoaded');
		this.rootPage = HomePage;
	}
}