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
	experiences: any;

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
		
		this.experiences = [
			{
				job_title: '保安主任',
				company: '太平洋酒店',
				description: '維持的士站之車輛輪候區秩序、揮車輛分流、登記的士進出場,有興趣亦可兼任的士上客區接待乘客的客戶服務工作。',
				time: {start_year: '2018', end_year: '2016'}
			},
			{
				job_title: '保安主任',
				company: '太平洋酒店',
				description: '維持的士站之車輛輪候區秩序、揮車輛分流、登記的士進出場,有興趣亦可兼任的士上客區接待乘客的客戶服務工作。',
				time: {start_year: '2016', end_year: '2013'}
			},
			{
				job_title: '保安主任',
				company: '太平洋酒店',
				description: '維持的士站之車輛輪候區秩序、揮車輛分流、登記的士進出場,有興趣亦可兼任的士上客區接待乘客的客戶服務工作。',
				time: {start_year: '2013', end_year: '2007'}
			},
		]
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = '';
	}

	onChange(field) {
		console.log('field', field);
	}
}