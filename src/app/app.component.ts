import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { BaseApp } from '../core/base-app';
import { Config } from '../config';
import { Utils } from '../core/providers/utils';
import { Api } from '../providers';

import { MenuComponent } from '../components/menu/menu';
import { LanguagePage } from '../pages/language/language';

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
			// this.rootPage = MenuComponent;
			this.initPage();
		}
	}

	initPage() {
		this.utils.getLocal('fs_first_time', true).then(first_time => {
			console.log('fs_first_time', first_time);

			// First time user
			if (first_time) return this.rootPage = LanguagePage;

			// Normal user
			this.rootPage = MenuComponent;
		})
	}
}