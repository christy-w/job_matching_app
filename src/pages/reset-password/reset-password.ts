import { Component, ViewChild } from '@angular/core';
import { Platform, ViewController, NavController, Slides } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { MenuComponent } from '../../components/menu/menu';
import { Api } from '../../providers';

@IonicPage()
@Component({
	selector: 'page-reset-password',
	templateUrl: 'reset-password.html'
})
export class ResetPasswordPage extends BasePage {
	@ViewChild('resetPwSlides') slides: Slides;

	name: string = 'ResetPasswordPage';
	mobile_input: string = '';
	password_input: string = '';
	password_confirm_input: string = '';
	code_input: string = '';
	reset_data: any;
	forget_response: any;
	saved_mobile: string = '';

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('SignUpPage constructor');

	}
  
	ngAfterViewInit() {
		if(this.slides) {
			this.slides.lockSwipes(true);
			this.slides.slidesPerView = '1';
			this.slides.centeredSlides = true;
			this.slides.loop = false;
		}

		this.utils.getLocal('USER_AUTH').then(auth => {
			if (auth) {
				this.saved_mobile = auth.mobile;
				this.mobile_input = this.saved_mobile;
			}
		})
	}

	submitReset() {
		if (this.mobile_input && this.password_input && this.password_confirm_input) {
			if (this.password_input === this.password_confirm_input) {
				// Data validation is completed, proceed to sign up
				if (this.password_input.length < 6) {
					this.utils.showAlert('', this.utils.instantLang('MSG.PASSWORD_TOO_SHORT'));
				} else {
					var reset_input = {
						"mobile": this.mobile_input
					};
					this.api.startQueue([
						this.api.postForgetPassword(reset_input)
					]).then(response => {
						this.forget_response = response[0];
	
						if (this.forget_response.status == false) {
							if (this.forget_response.error.includes('Unable to email')) {
								this.utils.showAlert('', this.utils.instantLang('MSG.INVALID_USER'));
							}
						} else {
							this.goNextSlide();
						}
					});
				}
			} else {
				this.utils.showAlert('', this.utils.instantLang('MSG.PASSWORD_DIFF'));
			}
		} else {
			console.log(this.utils.currentLang());
			this.utils.showAlert('', this.utils.instantLang('MSG.MISSING_INFO'));
		}
	}

	resendVerifyCode() {
		var reset_input = {
			"mobile": this.mobile_input
		};
		this.api.startQueue([
			this.api.postForgetPassword(reset_input)
		]).then(response => {
			this.forget_response = response[0];

			if (this.forget_response.status) {
				var forget_code = this.forget_response.message.code;
				this.utils.showAlert(this.utils.instantLang('ACTION.ACTIVATE'), this.utils.instantLang('MSG.ACTIVATION') + forget_code);
			}
		});
	}

	resetPassword() {
		var reset_input = {
			"code": this.code_input,
			"password": this.password_input,
			"password_confirm": this.password_confirm_input
		  }
		this.api.startQueue([
			this.api.postResetPassword(reset_input)
		]).then(response => {
				this.reset_data = response[0];
				console.log('reset_data', this.reset_data);

			}).catch(err => {
				console.log('login error', err);
		});
	}
	
	popToLoginPage() {
		this.nav.pop();
	}

	resetLogin() {
		this.nav.setRoot('WelcomePage');
		this.utils.removeLocal('USER_AUTH').then(removal => {
			console.log('removal', removal);
		});
	}

	goNextSlide() {
		console.log('slide next');
		this.slides.lockSwipes(false);
		this.slides.slideNext();
		this.slides.lockSwipes(true);

		var forget_code = this.forget_response.message.code;
		this.utils.showAlert(this.utils.instantLang('ACTION.ACTIVATE'), this.utils.instantLang('MSG.ACTIVATION') + forget_code);

	}
	
	goPrevSlide() {
		console.log('slide prev');
		this.slides.lockSwipes(false);
		this.slides.slidePrev();
		this.slides.lockSwipes(true);
	}

	confirmCode() {
		if (this.code_input) {
			if (this.code_input === this.forget_response.message.code) {
				var reset_input = {
					"code": this.code_input,
					"password": this.password_input,
					"password_confirm": this.password_confirm_input
				}
				this.api.startQueue([
					this.api.postResetPassword(reset_input)
				]).then(response => {
					var reset = response[0];

					if (reset.status && reset.status == true) {
						this.utils.showToast(this.utils.instantLang('MSG.RESET_SUCCESS'));
						if (this.saved_mobile) {
							this.resetLogin();
						} else {
							this.popToLoginPage();
						}
					} else {
						this.utils.showConfirm('', this.utils.instantLang('MSG.RESET_FAILED'), () => {
							this.goPrevSlide();
						})
					}
				});
			} else {
				console.log('Fail to reset');
				this.utils.showConfirm('', this.utils.instantLang('MSG.INCORRECT_ACTIVATION'), () => {
					this.resendVerifyCode();
				}, () => {}, 'ACTION.SEND_CODE_AGAIN');
			}
		} else {
			this.utils.showAlert('', this.utils.instantLang('MSG.MISSING_INFO'));
		}
	}
}