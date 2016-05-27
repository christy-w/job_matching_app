/**
 * Base class for all pages, with common functions and member variables for quick access
 * @Page and templates to be defined in child classes
 **/

import {Config} from '../providers/config';
import {LocalData} from './providers/local-data';
import {LanguageSelector} from './providers/language-selector';
import {ViewChild} from '@angular/core';
import {
	// System-related dependencies
	Page,
	Platform,
	ViewController,
	NavController,
	NavParams,
	Content,
	
	// UI-related dependencies
	Alert,
	Loading,
	Modal,
	Toast
} from 'ionic-angular';

export class BasePage {
	
    // member variables accessible from child classes
	@ViewChild(Content) content: Content;
	protected mModal: Modal;
	protected mLoading: Loading;
	
	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected params: NavParams = null
	) {
		console.log('BasePage constructor');
	}
	
	// Alert Message
	showAlert(title: string, subtitle: string = '', button_text: string = 'Ok'): Alert {
		let alert = Alert.create({
			title: title,
			subTitle: subtitle,
			buttons: [button_text]
		});
		this.nav.present(alert);
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
						this.platform.exitApp();
					}
				}
			]
		});
		this.nav.present(alert);
		return alert;
	}

	// Loading Spinner
	showLoading(content: string = 'Loading...'): Loading {
		this.mLoading = Loading.create({
			content: content
		});
		this.nav.present(this.mLoading);
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
		this.nav.present(this.mModal);
		return this.mModal;
	}
	
	// Toast Message
	showToast(msg: string, duration: number = 3000): Toast {
		let toast = Toast.create({
			message: msg,
			duration: duration
		});
		this.nav.present(toast);
		return toast;
	}
	
	// Back to previous page, or to root page
	goBack(toRoot: boolean = false, opts: Object = {}) {
		(toRoot) ? this.nav.popToRoot(opts) : this.nav.pop(opts);
	}
	
	// Nav events: http://ionicframework.com/docs/v2/api/components/nav/NavController/
	onPageLoaded() {
	}
	onPageWillEnter() {
	}
	onPageDidEnter() {
		// TODO: add Analytics code
		console.log('onPageDidEnter: ' + this.view.name);
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