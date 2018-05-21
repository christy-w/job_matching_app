import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';
import { OneSignal } from '@ionic-native/onesignal';
import { Network } from '@ionic-native/network';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ThemeableBrowser, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { TranslateService } from '@ngx-translate/core';
import {
	Platform,
	ActionSheet, ActionSheetController, ActionSheetOptions,
	Alert, AlertController, AlertOptions,
	Loading, LoadingController, LoadingOptions,
	Modal, ModalController, ModalOptions,
	Popover, PopoverController, PopoverOptions,
	Toast, ToastController, ToastOptions
} from 'ionic-angular';
import { Config } from '../../config';
import _ from 'lodash';

/**
 * Class with utility functions
 */
@Injectable()
export class Utils {
	
	constructor(
		private platform: Platform,

		// http://ionicframework.com/docs/v2/api/components/action-sheet/ActionSheetController/
		private actionSheetCtrl: ActionSheetController,

		// http://ionicframework.com/docs/v2/api/components/alert/AlertController/
		private alertCtrl: AlertController,

		// http://ionicframework.com/docs/v2/api/components/loading/LoadingController/
		private loadingCtrl: LoadingController,

		// http://ionicframework.com/docs/v2/api/components/modal/ModalController/
		private modalCtrl: ModalController,

		// http://ionicframework.com/docs/v2/api/components/popover/PopoverController/
		private popoverCtrl: PopoverController,

		// http://ionicframework.com/docs/v2/api/components/toast/ToastController/
		private toastCtrl: ToastController,

		// https://github.com/driftyco/ionic-storage
		private storage: Storage,

		// Ionic Native
		private appVersion: AppVersion,
		private network: Network,
		private onesignal: OneSignal,
		private ga: GoogleAnalytics,
		private statusbar: StatusBar,
		private splashScreen: SplashScreen,
		private themeableBrowser: ThemeableBrowser,

		// 3-party providers
		// https://github.com/ngx-translate/core
		private translate: TranslateService
	) {
	}

	// Create ActionSheet object (without presenting to view)	
	public createActionSheet(opts: ActionSheetOptions): ActionSheet {
		return this.actionSheetCtrl.create(opts);
	}

	// Display ActionSheet
	public async showActionSheet(opts: ActionSheetOptions): Promise<any> {
		let actionsheet = this.createActionSheet(opts);
		return actionsheet.present();
	}

	// Create Alert object (without presenting to view)	
	public createAlert(opts: AlertOptions): Alert {
		return this.alertCtrl.create(opts);
	}

	// Display Basic Alert
	public async showAlert(title: string, subtitle: string = '', buttons: string[] = ['OK']): Promise<any> {
		let alert = this.createAlert({ title: title, subTitle: subtitle, buttons: buttons });
		return alert.present();
	}
	
	// Display Confirmation Alert
	public async showConfirm(title: string, msg: string = '', confirm_handler: Function, cancel_handler: Function = null): Promise<any> {
		let options: any = {
			title: title,
			message: msg,
			buttons: [
				{
					text: this.translate.instant('ACTION.CANCEL'),
					handler: cancel_handler
				},
				{
					text: this.translate.instant('ACTION.CONFIRM'),
					handler: confirm_handler
				}
			]
		};
		let alert = this.createAlert(options);
		return alert.present();
	}

	// Create Loading object (without presenting to view)
	public createLoading(opts?: LoadingOptions): Loading {
		return this.loadingCtrl.create(opts);
	}

	// Display Loading component
	public async showLoading(content: string, duration: number = 3000): Promise<any> {
		let loading = this.createLoading({ content: content, duration: duration });
		return loading.present();
	}

	// Create Modal object (without presenting to view)
	public createModal(component: any, data?: any, opts?: ModalOptions): Modal {
		return this.modalCtrl.create(component, data, opts);
	}

	// Display Modal page
	public async showModal(component: any, data?: any, opts?: ModalOptions): Promise<any> {
		let modal = this.createModal(component, data, opts);
		return modal.present();
	}

	// Create Popover object (without presenting to view)
	public createPopover(component: any, data?: any, opts?: PopoverOptions): Popover {
		return this.popoverCtrl.create(component, data, opts);
	}

	// Display Popover page
	public async showPopover(component: any, data?: any, opts?: PopoverOptions): Promise<any> {
		let popover = this.createPopover(component, data, opts);
		return popover.present();
	}

	// Create Toast object (without presenting to view)
	public createToast(opts: ToastOptions): Toast {
		return this.toastCtrl.create(opts);
	}

	// Display Basic Toast
	public async showToast(msg: string, duration: number = 3000): Promise<any> {
		let toast = this.createToast({ message: msg, duration: duration });
		return toast.present();
	}

	// Get current platform name     
	public currentOS(): string {
		if (this.platform.is('android'))
			return 'android';
		else if (this.platform.is('ios'))
			return 'ios';
		else
			return '';
	}

	// Set local data
	public async setLocal(key: string, value: any): Promise<any> {
		Config.DEBUG_LOCAL_DATA && console.log('Local Set (key = ' + key + ')', value);
		return this.storage.set(key, value);
	}
	
	// Get local data
	public async getLocal(key: string, default_value: any = null): Promise<any> {
		return this.storage.get(key).then(data => {
			Config.DEBUG_LOCAL_DATA && console.log('Local Get (key = ' + key + ')', data);
			return (typeof data == 'undefined' || data == null) ? default_value : data;
		}).catch(err => {
			Config.DEBUG_LOCAL_DATA && console.log('Local Get (key = ' + key + ')', default_value);
			return default_value;
		});
	}

	// Remove local data by key
	public async removeLocal(key: string): Promise<any> {
		return this.storage.remove(key);
	}

	// Remove all local data
	public async clearLocal(): Promise<any> {
		return this.storage.clear();
	}

	// Init language setup
	public async setupLang(): Promise<string> {
		// get stored interface language
		let saved_lang: string = await this.getLocal('UI_LANGUAGE');

		// this language will be used as a fallback when a translation isn't found in the current language
		this.translate.setDefaultLang(Config.DEFAULT_LANGUAGE);
		
		if (saved_lang) {
			// use language saved to local
			Config.DEBUG_VERBOSE && console.log('Use saved language: ' + saved_lang);
			await this.translate.use(saved_lang);
			return Promise.resolve(saved_lang);
		} else {
			// detect device language (get only first 2 characters, e.g. en-US > en)
			let lang = this.translate.getBrowserCultureLang().split('-')[0];
			lang = /(zh|en)/gi.test(lang) ? lang : Config.DEFAULT_LANGUAGE;
			Config.DEBUG_VERBOSE && console.log('Detect user language: ' + lang);
			await this.translate.use(lang);
			return Promise.resolve(lang);
		}
	}
	
	// Change language
	public changeLang(value) {
		// change language only when the target value is within "available list"
		if (_.includes(Config.AVAILABLE_LANGUAGES, value)) {
			this.setLocal('UI_LANGUAGE', value);
			this.translate.use(value);
		}
	}
	
	// Get current app language
	public currentLang() {
		return this.translate.currentLang;
	}
	
	// Get localized string (async)
	public async getLang(key: string | string[], params?: Object): Promise<any> {
		return this.translate.get(key, params).toPromise();
	}

	// Get localized string (sync)
	public instantLang(key: string | string[], params?: Object): string {
		return this.translate.instant(key, params);
	}

	// Check whether supports cordova or not	
	public isCordova(): boolean {
		return this.platform.is('cordova');
	}

	// Check whether the device is online	
	public isOnline(): boolean {
		if (this.isCordova()) {
			// Network types: unknown, ethernet, wifi, 2g, 3g, 4g, cellular, none
			Config.DEBUG_VERBOSE && console.log('Network.type = ' + this.network.type);
			return (this.network.type != 'none');
		} else {
			return true;
		}
	}

	// Get version number
	public async currentVersion(): Promise<string> {
		return this.isCordova() ? this.appVersion.getVersionNumber() : Promise.resolve(Config.APP_VERSION);
	}

	// Setup Google Analytics	
	public setupGoogleAnalytics() {
		if (this.platform.is('cordova') && Config.GA_TRACKER_ID) {
			Config.DEBUG_ANALYTICS && console.log('Setting up Google Analytics');
			if (Config.GA_DEBUG_MODE) {
				this.ga.debugMode();
			}

			this.ga.startTrackerWithId(Config.GA_TRACKER_ID);
			this.ga.enableUncaughtExceptionReporting(Config.GA_DEBUG_MODE);
		}
	}

	// Google Analytics - Set User ID	
	public setGoogleAnalyticsUserId(id: number | string) {
		if (this.platform.is('cordova') && Config.GA_TRACKER_ID) {
			this.ga.setUserId(id + '');
		}
	}

	// Google Analytics - Track View
	public async trackView(title: string, campaign_url?: string): Promise<any> {
		Config.DEBUG_ANALYTICS && console.log('Track View: ' + title);
		if (this.platform.is('cordova') && Config.GA_TRACKER_ID) {
			return this.ga.trackView(title, campaign_url);
		} else {
			return Promise.resolve();
		}
	}

	// Google Analytics - Track Event
	public async trackEvent(category: string, action: string, label: string, value?: number): Promise<any> {
		if (this.platform.is('cordova') && Config.GA_TRACKER_ID) {
			return this.ga.trackEvent(category, action, label, value);
		} else {
			return Promise.resolve();
		}
	}
	
	// Statusbar
	public setupStatusbar() {
		if (this.isCordova()) {
			this.statusbar.backgroundColorByHexString(Config.STATUSBAR_COLOR);
		}
	}

	// Splash Screen
	public showSplashScreen() {
		if (this.isCordova()) {
			this.splashScreen.show();
		}
	}
	public hideSplashScreen() {
		if (this.isCordova()) {
			this.splashScreen.hide();
		}
	}

	// Setup OneSignal
	// http://ionicframework.com/docs/v2/native/onesignal/
	public setupOneSignal(end_init: boolean = true): OneSignal {
		if (this.platform.is('cordova') && Config.ONESIGNAL_APP_ID) {
			Config.DEBUG_PUSH_NOTIFICATION && console.log('Setting up OneSignal');
			this.onesignal.startInit(Config.ONESIGNAL_APP_ID, Config.ONESIGNAL_GOOGLE_PROJECT_NUMBER);
			
			/*
			this.onesignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);
			this.onesignal.handleNotificationReceived().subscribe(() => {
				// do something when notification is received
			});
			this.onesignal.handleNotificationOpened().subscribe(() => {
				// do something when a notification is opened
			});
			*/

			if (end_init)
				this.onesignal.endInit();

			return this.onesignal;
		} else {
			return null;
		}
	}

	// Themeable In-App Browser
	// http://ionicframework.com/docs/v2/native/themeablebrowser/
	public showBrowser(url: string, target: string = '_blank', options = null): ThemeableBrowserObject {
		if (options === null) {
			// use default options from config
			options = {
				statusbar: {
					color: Config.BROWSER_STATUSBAR_COLOR
				},
				toolbar: {
					height: 44,
					color: Config.BROWSER_TOOBAR_COLOR
				},
				title: {
					color: Config.BROWSER_TITLE_COLOR,
					showPageTitle: true
				},
				closeButton: {
					wwwImage: 'assets/icon/cross.png',
					wwwImagePressed: 'assets/icon/cross.png',
					wwwImageDensity: 2,
					align: 'left'
				},
				backButton: {
					wwwImage: 'assets/icon/left_active.png',
					wwwImagePressed: 'assets/icon/left_inactive.png',
					wwwImageDensity: 2,
					align: 'right'
				},
				forwardButton: {
					wwwImage: 'assets/icon/right_active.png',
					wwwImagePressed: 'assets/icon/right_active.png',
					wwwImageDensity: 2,
					align: 'right'
				},
				backButtonCanClose: true
			};
		}

		return this.themeableBrowser.create(url, target, options);
	}
}