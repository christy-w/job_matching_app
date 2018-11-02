import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';

import { MenuComponent } from '../../components/menu/menu';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage extends BasePage {

	name: string = 'LoginPage';

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils
	) {
		super(platform, view, nav, utils);
    	Config.DEBUG_VERBOSE && console.log('LoginPage constructor');
	}

	openSignUpPage() {
		this.nav.setRoot('SignUpPage');
	}

	openHomePage() {
		this.nav.setRoot(MenuComponent);
	}
}