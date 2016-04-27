/**
 * Base class for all pages, with common functions and member variables for quick access
 * @Page and templates to be defined in child classes
 **/

import {ViewChild} from 'angular2/core';
import {
	// System-related dependencies
	Platform,
	ViewController,
	NavController,
	NavParams,
	Content,
	Storage,
	SqlStorage,
	
	// UI-related dependencies
	Alert,
	Loading,
	Modal,
	Toast
} from 'ionic-angular';

export class BasePage {

    // member variables accessible from child classes
	@ViewChild(Content) protected mContent: Content;
	protected mPlatform: Platform;
	protected mView: ViewController;
	protected mNav: NavController;
	protected mParams: NavParams;
	protected mModal: Modal;
	protected mLoading: Loading;
	protected mStorage: Storage;
	
	constructor(platform: Platform, view: ViewController, nav: NavController, params: NavParams = null) {
		this.mPlatform = platform;
		this.mView = view;
		this.mNav = nav;
		this.mParams = params;
		
		// setup SqlStorage (instead of LocalStorage)
		this.mStorage = new Storage(SqlStorage, {});
	}
	
	// Alert Message
	showAlert(title: string, subtitle: string = '', button_text: string = 'Ok'): Alert {
		let alert = Alert.create({
			title: title,
			subTitle: subtitle,
			buttons: [button_text]
		});
		this.mNav.present(alert);
		return alert;
	}
	
	// Exit Confirm Dialog	
	showExitDialog() {
		let alert = Alert.create({
			title: 'Exit App',
			message: 'Confirm?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						//console.log('Cancelled');
					}
				},
				{
					text: 'Exit',
					handler: () => {
						this.mPlatform.exitApp();
					}
				}
			]
		});
		this.mNav.present(alert);
		return alert;
	}

	// Loading Spinner
	showLoading(content: string = 'Loading...'): Loading {
		this.mLoading = Loading.create({
			content: content
		});
		this.mNav.present(this.mLoading);
		return this.mLoading;
	}
	
	hideLoading() {
		if (this.mLoading) {
			this.mLoading.dismiss();
		}
	}

	// Modal
	showModal(component: any, data: Object = {}): Modal {
		this.mModal = Modal.create(component, data);
		this.mNav.present(this.mModal);
		return this.mModal;
	}
	
	// Toast Message
	showToast(msg: string, duration: number = 3000): Toast {
		let toast = Toast.create({
			message: msg,
			duration: duration
		});
		this.mNav.present(toast);
		return toast;
	}
	
	// Back to previous page, or to root page
	goBack(toRoot: boolean = false, opts: Object = {}) {
		(toRoot) ? this.mNav.popToRoot(opts) : this.mNav.pop(opts);
	}
	
	// Nav events: http://ionicframework.com/docs/v2/api/components/nav/NavController/
	onPageLoaded() {
	}
	onPageWillEnter() {
	}
	onPageDidEnter() {
		if (this.mView.name != 'InitPage') {
			// TODO: add Analytics code
		}
	}
	onPageWillLeave() {
	}
	onPageDidLeave() {
	}
	onPageWillUnload() {
	}
	onPageDidUnload() {
	}
}