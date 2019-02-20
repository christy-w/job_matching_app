import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';

import { MenuComponent } from '../../components/menu/menu';
import _ from 'lodash';

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
				var login_response = response[0];

				if (login_response.status == false) {
					// Login failed
					if (login_response.error.includes('inactive')) {
						this.utils.showConfirm('', this.utils.instantLang('MSG.INACTIVATED_USER'), () => {
							this.goActivate();
						});
					} else if (login_response.error.includes('Incorrect')) {
						this.utils.showAlert('', this.utils.instantLang('MSG.INCORRECT_INPUT'));
					}
				} else {
					this.user = login_response;
					console.log('user', this.user);
	
					// Direct applicant/employer user to pages
					Config.USER_AUTH = this.user;
					this.utils.setLocal('USER_AUTH', this.user);
					this.nav.setRoot(MenuComponent);
				}
			}).catch(err => {
				console.log('Login Error', err);
			});
		} else {
			// Show alert box for missing information
			console.log(this.utils.currentLang());
			this.utils.showAlert('', this.utils.instantLang('LOGIN.MISSING_INFO'));
		}
	}

	goActivate() {
		let data = { 'user_mobile' : this.mobile_input, 'user_pw': this.password_input }
		this.nav.push('ActivatePage', data);
	}

	openSignUpPage() {
		this.nav.push('SignUpPage');
	}

	openHomePage() {
		this.nav.setRoot(MenuComponent);
	}
}