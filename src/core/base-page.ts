/**
 * Base class for all pages, with common functions and member variables for quick access
 * @Component and templates to be defined in child classes
 **/
import { ViewChild } from '@angular/core';
import {
	// System-related dependencies
	Platform,
	ViewController,
	NavController,
	Content
} from 'ionic-angular';
import { Config } from '../config';
import { Utils } from './providers/utils';

export class BasePage {

	// member variables accessible from child classes
	@ViewChild(Content) content: Content;
	language: string = Config.DEFAULT_LANGUAGE;
	
	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils
	) {
		Config.DEBUG_VERBOSE && console.log('BasePage constructor');
		this.language = this.utils.currentLang();
	}
	
	// Back to previous page, or to root page
	goBack(toRoot: boolean = false, opts: Object = {}) {
		(toRoot) ? this.nav.popToRoot(opts) : this.nav.pop(opts);
	}
	
	// Nav events: http://ionicframework.com/docs/v2/api/navigation/NavController/
	ionViewDidLoad() {
	}
	ionViewWillEnter() {
	}
	ionViewDidEnter() {
		// Google Analytics track view
		this.utils.trackView(this.view.name);
	}
	ionViewWillLeave() {
	}
	ionViewDidLeave() {
	}
	ionViewWillUnload() {
	}
}