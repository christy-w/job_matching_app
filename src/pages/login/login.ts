import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';

import { MenuComponent } from '../../components/menu/menu';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage extends BasePage {

	name: string = 'LoginPage';
	user: any;
	mobile_input: string = '';
	password_input: string = '';

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('LoginPage constructor');
	}

	login() {
		if (this.mobile_input && this.password_input) {
			var login_input = {
				"mobile": this.mobile_input,
				"password": this.password_input,
			};
			this.api.startQueue([
				this.api.postLogin(login_input)
			]).then(response => {
				this.user = response[0];
				console.log('user', this.user);

				// Direct applicant/employer user to pages
				Config.USER_TYPE = this.user.main_group;
				this.nav.setRoot(MenuComponent);
			});
		} else {
			console.log('missing information');
		}
	}

	openSignUpPage() {
		this.nav.push('SignUpPage');
	}

	openHomePage() {
		this.nav.setRoot(MenuComponent);
	}
}