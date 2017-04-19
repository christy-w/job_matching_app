import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';

@IonicPage()
@Component({
	templateUrl: 'home.html'
})
export class HomePage extends BasePage {

	name: string = 'HomePage';
	
	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('HomePage constructor');
	}
}