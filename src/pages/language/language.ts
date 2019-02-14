import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';

@IonicPage()
@Component({
	selector: 'page-language',
	templateUrl: 'language.html'
})
export class LanguagePage extends BasePage {

	name: string = 'LanguagePage';

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils
	) {
		super(platform, view, nav, utils);
    	Config.DEBUG_VERBOSE && console.log('LanguagePage constructor');
  }
  
  setLanguage(language) {
	console.log('Selected language: ' + language);
	this.utils.setLocal('UI_LANGUAGE', language);
	this.utils.changeLang(language);
    this.nav.setRoot('WelcomePage');
  }
}