import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { BaseApp } from '../core/base-app';
import { Config } from '../config';
import { Utils } from '../core/providers/utils';
import { Api } from '../providers';

@Component({
	templateUrl: 'app.html'
})
export class MyApp extends BaseApp {
	
	constructor(platform: Platform, api: Api, utils: Utils) {
		super(platform, api, utils);
		Config.DEBUG_VERBOSE && console.log('MyApp constructor');
	}

	// override parent
	protected onAppLoaded() {
		// set rootpage only when the app is ready
		Config.DEBUG_VERBOSE && console.log('MyApp onAppLoaded');
		
		// load default page
		if (typeof this.nav.getActive() == 'undefined') {
			this.rootPage = Config.START_PAGE;
		}
	}
}