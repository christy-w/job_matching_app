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
	selector: 'page-sign-up',
	templateUrl: 'sign-up.html'
})
export class SignUpPage extends BasePage {
	@ViewChild('signUpSlides') slides: Slides;

	name: string = 'SignUpPage';
	mobile_input: string = '';
	password_input: string = '';
	password_confirm_input: string = '';
	signUp: any;

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
			this.slides.slidesPerView = '1';
			this.slides.centeredSlides = true;
			this.slides.loop = false;
		}
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
					this.signUp = response[0];
					console.log('signUp', this.signUp);

					this.goNextSlide(this.signUp);
				}).catch(err => {
					console.log('login error', err);
				});
			} else {
				this.utils.showAlert(this.utils.instantLang('MSG.PASSWORD_DIFF'));
			}
		} else {
			console.log(this.utils.currentLang());
			this.utils.showAlert(this.utils.instantLang('MSG.MISSING_INFO'));
		}
	}

	getActivationCode() {

	}
	
	openLoginPage() {
		this.nav.pop();
	}

	goNextSlide(sign_up_data) {
		console.log('slide next');
		this.slides.slideNext();

		var activation_code = sign_up_data.message.code;
		this.utils.showAlert(this.utils.instantLang('ACTION.ACTIVATE'), this.utils.instantLang('MSG.ACTIVATION') + activation_code);
	}
	
	goPrevSlide() {
		console.log('slide prev');
		this.slides.slidePrev();
	}

	confirmCode() {
		this.nav.setRoot(MenuComponent);
	}
}