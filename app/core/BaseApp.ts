/**
 * Base class for application, with common workflow when upon app start
 * @App to be defined in child classes
 **/
import {ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
//import {ForceUpgradePage} from '../pages/force-upgrade/force-upgrade';

export class BaseApp {
	
	// the root nav is a child of the root app component
	// @ViewChild(Nav) gets a reference to the app's root nav
	@ViewChild(Nav) nav: Nav;
	
	// default page to display
	protected rootPage: any;
	
    constructor(
		platform: Platform
	) {
		console.log('BaseApp constructor');
		
		platform.ready().then(() => {
			StatusBar.styleDefault();
			Splashscreen.hide();

			// TODO: check force upgrade logic
			this.onAppLoaded();
		});
	}

	// TODO: inherit this function from child class (e.g. MyApp)
	protected onAppLoaded() {
	}
}
