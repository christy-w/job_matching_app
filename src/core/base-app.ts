/**
 * Base class for application, with common workflow when upon app start
 * @Component to be defined in child classes
 **/
import { ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { Config } from '../config';
import { Utils } from './providers/utils';
import { BasePage } from './base-page';
import { Api } from '../providers';
import { NewVersionPage } from './components/new-version/new-version';

export class BaseApp {
	
	// the root nav is a child of the root app component
	// @ViewChild(Nav) gets a reference to the app's root nav
	@ViewChild(Nav) nav: Nav;

	// default page to display
	public rootPage: any;

	constructor(
		protected platform: Platform,
		protected api: Api,
		protected utils: Utils
	) {
		Config.DEBUG_VERBOSE && console.log('BaseApp constructor');
		
		// override Android hardware back button
		platform.registerBackButtonAction(() => {
			
			// check current page name
			let page = <BasePage>this.nav.root;
			if (!this.nav.canGoBack() && page.name == Config.ROOT_PAGE_NAME) {
				// show Exit App confirmation box
				this.utils.showConfirm('', this.utils.instantLang('MSG.CONFIRM_EXIT_APP'), () => {
					this.platform.exitApp();
				});
			} else {
				// normal go back navigation
				this.nav.pop();
			}
		});
		
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.utils.setupStatusbar();
			
			// JuicyLauncher setup
			this.utils.setupLang().then(() => {
				this.utils.setupGoogleAnalytics();
				this.utils.setupOneSignal();
				
				// check force or soft update
				this.checkVersion();
			});
		});
	}
	
	// Version checking	
	protected checkVersion() {

		this.api.init().then(data => {
			console.log('init response', data);
			// Prepare modal or popover, based on whether need to force upgrade
			if (data) {
				if (data.force_update) {
					// display force update model
					this.utils.showModal(NewVersionPage, { init_model: data });
					this.utils.hideSplashScreen();
					return;
				} else if (data.latest_version && data.latest_version != '' && data.latest_version != data.curr_version) {
					// check whether user has dismissed version upgrade notice before
					let latest_version_code: string = data.latest_version;
					let key: string = 'VERSION_CHECK_FROM_' + data.curr_version + '_TO_' + latest_version_code;
					this.utils.getLocal(key, false).then(skipped => {
						// display recommended update model
						if (!skipped) {
							this.utils.showModal(NewVersionPage, { init_model: data });
							this.utils.hideSplashScreen();
							return;
						}
					});
				}
			}
			
			// indicate the app is successfully loaded
			this.onAppLoaded();
			this.utils.hideSplashScreen();
		}).catch(err => {
			// version cannot be found from server, but still proceed to init the app
			console.log('init error', err);
			this.onAppLoaded();
			this.utils.hideSplashScreen();
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
