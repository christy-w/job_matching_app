import { Component } from '@angular/core';
import { Platform, ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';

@IonicPage()
@Component({
	selector: 'page-applicant-profile-detail',
	templateUrl: 'applicant-profile-detail.html'
})
export class ApplicantProfileDetailPage extends BasePage {

	name: string = 'ApplicantProfileDetailPage';
  detail: any;
  
	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
    protected utils: Utils,
    private params: NavParams
	) {
		super(platform, view, nav, utils);
    Config.DEBUG_VERBOSE && console.log('ApplicantProfileDetailPage constructor');
    
    this.detail = this.params.get('content');
    console.log('detail', this.detail);
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = '';
	}

	onChange(field) {
		console.log('field', field);
	}
}