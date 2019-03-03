import { Component } from '@angular/core';
import { Platform, ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { DatetimePicker } from '../../components/datetime-picker/datetime-picker';
import { Api } from '../../providers';
import _ from 'lodash';
import * as moment from 'moment';

@IonicPage()
@Component({
	selector: 'page-applicant-job',
	templateUrl: 'applicant-job.html'
})
export class ApplicantJobPage extends BasePage {

	name: string = 'ApplicantJobPage';
	job: any;

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private params: NavParams,
		private api: Api
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('ApplicantJobPage constructor');

		let job_id = this.params.get('job_id');
		this.initJobDetail(job_id);
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = 'job';
	}

	initJobDetail(job_id) {
		this.api.startQueue([
			this.api.getJobDetail(job_id)
		]).then(response => {
			let job = response[0];

			// Format publish dates
			let publish_date = moment(job.publish_date,'YYYY-MM-DD HH:mm:ss');
			var diff_days = moment().diff(publish_date, 'days');
			if (diff_days == 0) {
				job.diff_days_zh = '今天';
				job.diff_days_en = 'Today';
			} else if (diff_days > 0){
				job.diff_days_zh = diff_days + '日前';
				job.diff_days_en = diff_days + ' days ago';
			}

			// Format job type and wage
			let type = job.type;
			let monthly_wage = job.monthly_wage;
			let hourly_wage = job.hourly_wage;
			switch(type) {
				case 'fulltime':
					job.type_zh = '全職';
					job.type_en = 'Full Time';
					job.wage_zh = '$' + monthly_wage + '/月';
					job.wage_en = '$' + monthly_wage + '/Month';
					break;
				case 'parttime':
					job.type_zh = '兼職';
					job.type_en = 'Part Time';
					job.wage_zh = '$' + hourly_wage + '/小時';
					job.wage_en = '$' + hourly_wage + '/Hour';
					break;
				case 'temporary':
					job.type_zh = '臨時工作';
					job.type_en = 'Temporary Work';
					job.wage_zh = '$' + hourly_wage + '/小時';
					job.wage_en = '$' + hourly_wage + '/Hour';
					break;
			}
			this.job = job;
			console.log('job detail', this.job);
		});
	}

	openDatetimePicker() {
		let datetimePicker = this.utils.createPopover(DatetimePicker, {}, {cssClass:'datetime-picker'});
		datetimePicker.onDidDismiss(data => {
			// (data) ? this.saveFilter(data) : this.cancelFilter();
			// this.filterShown = false;
		});
	    datetimePicker.present();
	}
}