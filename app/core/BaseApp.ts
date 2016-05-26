/**
 * Base class for application, with common workflow when upon app start
 * @App to be defined in child classes
 **/

import {Config} from '../config';
import {ViewChild} from '@angular/core';
import {Events, Platform, Nav, Storage, SqlStorage} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TranslateService} from 'ng2-translate/ng2-translate';
import * as _ from 'lodash';

interface PageObj {
	title: string;
	component: any;
	icon: string;
	index?: number;
}

export class BaseApp {
	
	// the root nav is a child of the root app component
	// @ViewChild(Nav) gets a reference to the app's root nav
	@ViewChild(Nav) nav: Nav;

	// setup SqlStorage (instead of LocalStorage)
    protected storage: Storage = new Storage(SqlStorage, Config.SQLSTORAGE_OPTIONS);

	// default page to display
	protected rootPage: any;

	// page array (e.g. on sidemenu) 
	protected appPages: PageObj[] = [];
	
    constructor(
		protected platform: Platform,
		protected events: Events,
		protected translate: TranslateService
	) {
		platform.ready().then(() => {
			StatusBar.styleDefault();
			Splashscreen.hide();
			this.setupLang();
			this.subscribeEvents();
		});
	}
	
	// init language setting
	setupLang() {
		// get stored interface language
		this.storage.get(Config.STORAGE_UI_LANGUAGE).then(key => {
			let userLang: string;
			this.translate.setDefaultLang(Config.DEFAULT_LANGUAGE);
			
			if (key) {
				userLang = key;
			} else {
				userLang = navigator.language.split('-')[0]; // use navigator lang if available
				userLang = /(zh|en)/gi.test(userLang) ? userLang : Config.DEFAULT_LANGUAGE;
			}
			this.translate.use(userLang);
		});
	}
	
	// change language
	changeLang(value) {
		if (_.includes(Config.AVAILABLE_LANGUAGES, value)) {
			this.storage.set(Config.STORAGE_UI_LANGUAGE, value);
			this.translate.use(value);
		}
	}
	
	// set event listeners
	subscribeEvents() {
		this.events.subscribe('version:force_upgrade', () => {
		});
		
		this.events.subscribe('auth:login', () => {
		});
		
		this.events.subscribe('auth:logout', () => {
		});
		
		this.events.subscribe('language:change', (value) => {
			this.changeLang(value[0]);
		});
	}
}
