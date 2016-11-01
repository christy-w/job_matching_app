/**
 * Base class for application, with common workflow when upon app start
 * @Component to be defined in child classes
 **/
import { ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Config } from '../config';
import { Utils } from './providers/utils';
import { ApiService } from '../providers/api-service/api-service';
import { NewVersionPage } from '../pages/new-version/new-version';

export class BaseApp {

	// the root nav is a child of the root app component
	// @ViewChild(Nav) gets a reference to the app's root nav
	@ViewChild(Nav) nav: Nav;

	// default page to display
	public rootPage: any;

	constructor(
		protected platform: Platform,
		protected api: ApiService,
		protected utils: Utils
	) {
		Config.DEBUG_VERBOSE && console.log('BaseApp constructor');

		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();

			// JuicyLauncher setup
			utils.setupLang();
			utils.setupGoogleAnalytics();
			utils.setupOneSignal();
			this.checkVersion();
		});
	}

	// Version checking	
	protected checkVersion() {
		this.utils.currentVersion().then(curr_version_code => {
			let os: string = this.utils.currentOS();
			this.api.getVersions(curr_version_code, os).then(new_versions => {

				// New versions found
				if (new_versions.length > 0) {

					// Force upgrade checking
					let force_upgrade: boolean = false;
					new_versions.forEach(version => {
						if (version.force_upgrade && version.force_upgrade == '1') {
							force_upgrade = true;
						}
					})

					// Prepare modal or popover, based on whether need to force upgrade						
					let view_data = {
						force_upgrade: force_upgrade,
						curr_version_code: curr_version_code,
						new_versions: new_versions
					};
					if (force_upgrade) {
						this.utils.showModal(NewVersionPage, view_data);
					} else {
						// check whether user has dismissed version upgrade notice before
						let latest_version_code: string = new_versions[0].code;
						let key: string = 'VERSION_CHECK_FROM_' + curr_version_code + '_TO_' + latest_version_code;
						this.utils.getLocal(key, false).then(skipped => {
							if (!skipped) {
								// TODO: change to "popup" which display on page center
								this.utils.showModal(NewVersionPage, view_data);
							}
						});
					}
				}

				// indicate the app is successfully loaded
				this.onAppLoaded();
			}).catch(error => {
				// version cannot be found from server, but still proceed to init the app
				console.error('BaseApp', error);
				this.onAppLoaded();
			});
		}).catch(error => {
			console.error(error);
		});
	}

	// inherit this function from child class (e.g. MyApp)
	protected onAppLoaded() {
		Config.DEBUG_VERBOSE && console.log('BaseApp onAppLoaded');
	}

	// [For App with Tab / Sidemenu root only]
	protected openPage(page: any) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		if (this.nav && page) {
			this.nav.setRoot(page);
		}
	}
}
