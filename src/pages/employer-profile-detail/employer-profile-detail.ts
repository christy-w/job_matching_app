import { Component } from '@angular/core';
import { Platform, ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import _ from 'lodash';
import { Api } from '../../providers';

@IonicPage()
@Component({
	selector: 'page-employer-profile-detail',
	templateUrl: 'employer-profile-detail.html'
})
export class EmployerProfileDetailPage extends BasePage {

	user_profile: any;
	language: string = '';

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private params: NavParams,
		private api: Api
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('EmployerProfileDetailPage constructor');
	
		this.initEmployerProfile();
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = '';
		this.language = this.utils.currentLang();
	}

	initEmployerProfile() {
		this.api.startQueue([
			this.api.getEmployerProfile()
		]).then(response => {
			this.user_profile = response[0]; 
		});
	}
}