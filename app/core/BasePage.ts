/**
 * Base class for all pages, with common functions and member variables for quick access
 * @Component and templates to be defined in child classes
 **/
import {Component, ViewChild} from '@angular/core';
import {
	// System-related dependencies
	Platform,
	ViewController,
	NavController,
	NavParams,
	Content
} from 'ionic-angular';

export class BasePage {

	// member variables accessible from child classes
	@ViewChild(Content) content: Content;
	
	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected params: NavParams = null
	) {
		console.log('BasePage constructor');
	}
	
	// Back to previous page, or to root page
	goBack(toRoot: boolean = false, opts: Object = {}) {
		(toRoot) ? this.nav.popToRoot(opts) : this.nav.pop(opts);
	}
	
	// Nav events: http://ionicframework.com/docs/v2/api/components/nav/NavController/
	ionViewLoaded() {
	}
	ionViewWillEnter() {
	}
	ionViewDidEnter() {
		// TODO: add Analytics code
		console.log('ionViewDidEnter: ' + this.view.name);
	}
	ionViewWillLeave() {
	}
	ionViewDidLeave() {
	}
	ionViewWillUnload() {
	}
	ionViewDidUnload() {
	}
}