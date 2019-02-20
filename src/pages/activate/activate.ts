import { Component } from '@angular/core';
import { Platform, ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { MenuComponent } from '../../components/menu/menu';
import { Api } from '../../providers';

@IonicPage()
@Component({
	selector: 'page-activate',
	templateUrl: 'activate.html'
})
export class ActivatePage extends BasePage {

	name: string = 'ActivatePage';
	user_mobile: string = '';
	user_pw: string = '';
	sign_up_data: any;
	code_input: string = '';
	user: any;

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api,
		private params: NavParams
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('ActivatePage constructor');

		this.user_mobile = this.params.get('user_mobile');
		this.user_pw = this.params.get('user_pw');

		this.sendVerifyCode();
	}

	sendVerifyCode() {
		var signup_input = {
			"mobile": this.user_mobile,
			"password": this.user_pw
		};
		this.api.startQueue([
			this.api.postSignUpApplicant(signup_input)
		]).then(response => {
			this.sign_up_data = response[0];
			console.log('sign_up_data', this.sign_up_data);

			var activation_code = this.sign_up_data.message.code;
			this.utils.showAlert(this.utils.instantLang('ACTION.ACTIVATE'), this.utils.instantLang('MSG.ACTIVATION') + activation_code);
		}).catch(err => {
			console.log('login error', err);
		});
	}

	confirmCode() {
		if (this.code_input) {
			if (this.code_input === this.sign_up_data.message.code) {
				var activate_data = {
					"mobile": this.user_mobile,
					"code": this.code_input
				}
				this.api.postActivate(activate_data).then(activate => {
					if (activate) {
						var login_input = {
							"mobile": this.user_mobile,
							"password": this.user_pw,
						};
						this.api.startQueue([
							this.api.postLogin(login_input)
						]).then(response => {
							this.user = response[0];
			
							// Direct applicant/employer user to pages
							Config.USER_AUTH = this.user;
							this.utils.setLocal('USER_AUTH', this.user);
							this.nav.setRoot(MenuComponent);
						}).catch(err => {
							console.log('login error', err);
						});
					}
				});
			} else {
				console.log('Fail to activate');
				this.utils.showConfirm('', this.utils.instantLang('MSG.INCORRECT_ACTIVATION'), () => {
					this.sendVerifyCode();
				}, () => {}, 'ACTION.SEND_CODE_AGAIN');
			}
		} else {
			this.utils.showAlert('', this.utils.instantLang('MSG.MISSING_INFO'));
		}
	}
}