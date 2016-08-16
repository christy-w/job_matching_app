/**
 * Base class for application, with common workflow when upon app start
 * @Component to be defined in child classes
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
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			Splashscreen.hide();

			// TODO: check force upgrade logic

			// indicate the app is successfully loaded
			this.onAppLoaded();
		});
	}
	
	// inherit this function from child class (e.g. MyApp)
	protected onAppLoaded() {
		console.log('BaseApp onAppLoaded');
	}
	
	// [For App with Tab / Sidemenu root only]
	openPage(page: any) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		if (this.nav && page) {
			this.nav.setRoot(page);
		}
	}
}
