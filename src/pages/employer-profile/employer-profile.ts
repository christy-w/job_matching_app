import { Component } from '@angular/core';
import { Platform, ViewController, NavController, App } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';

@IonicPage()
@Component({
	selector: 'page-employer-profile',
	templateUrl: 'employer-profile.html'
})
export class EmployerProfilePage extends BasePage {

	name: string = 'EmployerProfilePage';
	language: string = '';
	profile_fields: any = [];
	user_profile: any;

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private app: App,
		private api: Api
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('EmployerProfilePage constructor');

		this.language = this.utils.currentLang();

		this.initEmployerProfile();
	}

	initEmployerProfile() {
		this.api.startQueue([
			this.api.getEmployerProfile()
		]).then(response => {
			this.user_profile = response[0]; 
			console.log('user_profile', this.user_profile);
		});
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = 'profile';
	}

	openProfileDetailPage() {
		this.nav.push('EmployerProfileDetailPage');
	}

	openApplicantPreferencePage() {
		this.nav.push('EmployerPreferencePage');
	}

	openApplicantRecordPage() {
		this.nav.push('EmployerRecordPage');
	}

	openAboutPage() {
		this.nav.push('AboutPage');
	}

	openTncPage() {
		this.nav.push('TncPage');
	}

	resetPassword() {
		this.utils.showConfirm('', this.utils.instantLang('MSG.FORGET_PASSWORD'), () => {
			this.app.getRootNav().setRoot('ResetPasswordPage');
		});
	}

	updateMobile() {
		this.utils.showConfirm('', this.utils.instantLang('MSG.UPDATE_MOBILE'), () => {
			this.app.getRootNav().setRoot('UpdateMobilePage');
		});
	}

	logout() {
		this.utils.showConfirm('', this.utils.instantLang('MSG.LOGOUT'), () => {
			this.utils.clearLocal();
			this.app.getRootNav().setRoot('WelcomePage');
		});
	}

	setLanguage(language) {
		console.log('Changing language to ', language);
		this.language = language;
		this.utils.changeLang(this.language);
	}
}