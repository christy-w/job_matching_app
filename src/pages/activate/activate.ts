import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
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
	mobile_input: string = '';
	password_input: string = '';
	password_confirm_input: string = '';
	code_input: string = '';
	sign_up_data: any;
	user: any;

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('ActivatePage constructor');
	}

	submitSignUp() {
		if (this.mobile_input && this.password_input && this.password_confirm_input) {
			if (this.password_input === this.password_confirm_input) {
				// Data validation is completed, proceed to sign up
				var signup_input = {
					"mobile": this.mobile_input,
					"password": this.password_input
				};
				this.api.startQueue([
					this.api.postSignUpApplicant(signup_input)
				]).then(response => {
					var sign_up_response = response[0];

					if (!sign_up_response.status) {
						switch(sign_up_response.error) {
							case 'mobile_registered':
								this.utils.showAlert('', this.utils.instantLang('MSG.MOBILE_REGISTERED'));
								this.goPrevSlide();
								break;
							default:
								break;
						}
					} else {
						this.sign_up_data = sign_up_response;
						console.log('sign_up_data', this.sign_up_data);
						this.goNextSlide();
					}
				}).catch(err => {
					console.log('login error', err);
				});
			} else {
				this.utils.showAlert('', this.utils.instantLang('MSG.PASSWORD_DIFF'));
			}
		} else {
			console.log(this.utils.currentLang());
			this.utils.showAlert('', this.utils.instantLang('MSG.MISSING_INFO'));
		}
	}

	sendVerifyCode() {
		var activation_code = this.sign_up_data.message.code;
		this.utils.showAlert(this.utils.instantLang('ACTION.ACTIVATE'), this.utils.instantLang('MSG.ACTIVATION') + activation_code);
	}

	resendVerifyCode() {
		var signup_input = {
			"mobile": this.mobile_input,
			"password": this.password_input
		};
		this.api.startQueue([
			this.api.postSignUpApplicant(signup_input)
		]).then(response => {
			this.sign_up_data = response[0];
			console.log('sign_up_data', this.sign_up_data);

			this.sendVerifyCode();
		}).catch(err => {
			console.log('login error', err);
		});
	}
	
	openLoginPage() {
		this.nav.pop();
	}

	goNextSlide() {
		// console.log('slide next');
		// this.slides.lockSwipes(false);
		// this.slides.slideNext();
		// this.slides.lockSwipes(true);

		this.sendVerifyCode();
	}
	
	goPrevSlide() {
		console.log('slide prev');
		// this.slides.lockSwipes(false);
		// this.slides.slidePrev();
		// this.slides.lockSwipes(true);
	}

	confirmCode() {
		if (this.code_input) {
			if (this.code_input === this.sign_up_data.message.code) {
				var activate_data = {
					"mobile": this.mobile_input,
					"code": this.code_input
				}
				this.api.postActivate(activate_data).then(activate => {
					if (activate) {
						var login_input = {
							"mobile": this.mobile_input,
							"password": this.password_input,
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
					this.resendVerifyCode();
				}, () => {}, 'ACTION.SEND_CODE_AGAIN');
			}
		} else {
			this.utils.showAlert('', this.utils.instantLang('MSG.MISSING_INFO'));
		}
	}
}