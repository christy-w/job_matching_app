import {Injectable} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {
	Platform,
	ActionSheet, ActionSheetController, ActionSheetOptions,
	Alert, AlertController, AlertOptions,
	Loading, LoadingController, LoadingOptions,
	Modal, ModalController, ModalOptions,
	Popover, PopoverController, PopoverOptions,
	Toast, ToastController, ToastOptions
} from 'ionic-angular';
import {AppVersion, GoogleAnalytics, OneSignal} from 'ionic-native';

import * as _ from 'lodash';
import {Config} from '../../config';
import {LocalData} from './local-data';

/**
 * Class with utility functions for quick
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

		// 3-party providers
		// https://github.com/ocombe/ng2-translate
		private translate: TranslateService,
		
		// custom providers
        private local: LocalData
	) {
	}

	// Create ActionSheet object (without presenting to view)	
	public createActionSheet(opts: ActionSheetOptions): ActionSheet {
		return this.actionSheetCtrl.create(opts);
	}

	// Display ActionSheet
	public showActionSheet(opts: ActionSheetOptions): Promise<any> {
		let actionsheet = this.createActionSheet(opts);
		return actionsheet.present();
	}

	// Create Alert object (without presenting to view)	
	public createAlert(opts: AlertOptions): Alert {
		return this.alertCtrl.create(opts);
	}

	// Display Basic Alert
	public showAlert(title: string, subtitle: string = '', buttons: string[] = ['OK']): Promise<any> {
		let alert = this.createAlert({title: title, subTitle: subtitle, buttons: buttons});
		return alert.present();
	}
	
	// Create Loading object (without presenting to view)
	public createLoading(opts: LoadingOptions): Loading {
		return this.loadingCtrl.create(opts);
	}
	
	// Display Loading component
	public showLoading(content: string, duration: number = 3000): Promise<any> {
		let loading = this.createLoading({content: content, duration: duration});
		return loading.present();
	}
	
	// Create Modal object (without presenting to view)
	public createModal(component: any, data: any = null, opts: ModalOptions): Modal {
		return this.modalCtrl.create(component, data, opts);
	}
	
	// Display Modal page
	public showModal(component: any, data: any = null, opts: ModalOptions = {}): Promise<any> {
		let modal = this.createModal(component, data, opts);
		return modal.present();
	}
	
	// Create Popover object (without presenting to view)
	public createPopover(component: any, data: any = null, opts: PopoverOptions): Popover {
		return this.popoverCtrl.create(component, data, opts);
	}
	
	// Display Popover page
	public showPopover(component: any, data: any = null, opts: PopoverOptions = {}): Promise<any> {
		let popover = this.createPopover(component, data, opts);
		return popover.present();
	}
	
	// Create Toast object (without presenting to view)
	public createToast(opts: ToastOptions): Toast {
		return this.toastCtrl.create(opts);
	}

	// Display Basic Toast
	public showToast(msg: string, duration: number = 3000): Promise<any> {
		let toast = this.createToast({message: msg, duration: duration});
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
	
	// Init language setup
	public setupLang() {
		// get stored interface language
        return this.local.get('UI_LANGUAGE', Config.DEFAULT_LANGUAGE).then(value => {
            let userLang: string;
            this.translate.setDefaultLang(Config.DEFAULT_LANGUAGE);
            
            if (value) {
                userLang = value;
            } else {
                userLang = navigator.language.split('-')[0]; // use navigator lang if available
                userLang = /(zh|en)/gi.test(userLang) ? userLang : Config.DEFAULT_LANGUAGE;
            }
            this.translate.use(userLang);
        });
	}
	
	// Change language
    public changeLang(value) {
        // change language only when the target value is within "available list"
        if (_.includes(Config.AVAILABLE_LANGUAGES, value)) {
			this.local.set('UI_LANGUAGE', value);
            this.translate.use(value);
        }
	}
	
	// Get current app language
	public currentLang() {
		return this.translate.currentLang;
	}
    
	// Get localized string (async)
    public getLang(key: string | string[], params: Object = null): Promise<any> {
        return this.translate.get(key).toPromise();
    }
    
	// Get localized string (sync)
    public instantLang(key: string | string[], params: Object = null): string {
        return this.translate.instant(key, params);
	}

	// Check whether supports cordova or not	
	public isCordova(): boolean {
		return this.platform.is('cordova');
	}
	
	// Get version number
	public currentVersion(): Promise<any> {
		return AppVersion.getVersionNumber();
	}
	
	// Setup Google Analytics	
	public setupGoogleAnalytics() {
		if (this.platform.is('cordova') && Config.GA_TRACKER_ID) {
			Config.DEBUG_ANALYTICS && console.log('Setting up Google Analytics');
			if (Config.GA_DEBUG_MODE) {
				GoogleAnalytics.debugMode();
			}
			
			GoogleAnalytics.startTrackerWithId(Config.GA_TRACKER_ID);
			GoogleAnalytics.enableUncaughtExceptionReporting(Config.GA_DEBUG_MODE);
		}
	}

	// Google Analytics - Set User ID	
	public setGoogleAnalyticsUserId(id: number | string) {
		if (this.platform.is('cordova') && Config.GA_TRACKER_ID) {
			GoogleAnalytics.setUserId(id + '');
		}
	}
	
	// Google Analytics - Track View
	public trackView(title: string, campaign_url?: string): Promise<any> {
		Config.DEBUG_ANALYTICS && console.log('Track View: ' + title);
		if (this.platform.is('cordova') && Config.GA_TRACKER_ID) {
			return GoogleAnalytics.trackView(title, campaign_url);
		} else {
			return Promise.resolve();
		}
	}
	
	// Google Analytics - Track Event
	public trackEvent(category: string, action: string, label: string, value?: number): Promise<any> {
		if (this.platform.is('cordova') && Config.GA_TRACKER_ID) {
			return GoogleAnalytics.trackEvent(category, action, label, value);
		} else {
			return Promise.resolve();
		}
	}

	// Setup OneSignal
	public setupOneSignal() {
		if (this.platform.is('cordova') && Config.ONESIGNAL_APP_ID) {
			Config.DEBUG_PUSH_NOTIFICATION && console.log('Setting up OneSignal');
			OneSignal.init(Config.ONESIGNAL_APP_ID, {
				autoRegister: true,
				googleProjectNumber: Config.ONESIGNAL_GOOGLE_PROJECT_NUMBER
			}).subscribe(jsonData => {
				Config.DEBUG_PUSH_NOTIFICATION && console.log('didReceiveRemoteNotificationCallBack', jsonData);
			}, error => {
				console.error('Utils > setupOneSignal() >', error);	
			});
			
			OneSignal.enableInAppAlertNotification(true);
		}
	}
}