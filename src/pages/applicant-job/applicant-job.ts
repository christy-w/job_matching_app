import { Component } from '@angular/core';
import { Platform, ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';
import _ from 'lodash';
import * as moment from 'moment';

@IonicPage()
@Component({
	selector: 'page-applicant-job',
	templateUrl: 'applicant-job.html'
})
export class ApplicantJobPage extends BasePage {
	language: string = '';
	name: string = 'ApplicantJobPage';
	job: any;
	isApplied: boolean = false;
	fav_jobs: any;

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
		Config.ACTIVE_TAB = 'home';
		this.language = this.utils.currentLang();
		this.getFavourited();
	}

	getFavourited() {
		this.utils.getLocal('FAV_JOBS', []).then(data => {
			this.fav_jobs = data;
			console.log('Favourited jobs', this.fav_jobs);
		});
	}

	checkFav(job_id) {
		return _.includes(this.fav_jobs, job_id);
	}

	clickFav(event:Event, job_id) {
		event.stopPropagation();
		if (_.includes(this.fav_jobs, job_id)) {
			// Remove spot if it exits in favourites
			_.pull(this.fav_jobs, job_id);
			this.utils.setLocal('FAV_JOBS', this.fav_jobs);
		} else {
			// Add spot if it does not exist in favourites
			this.fav_jobs.push(job_id);
			this.utils.setLocal('FAV_JOBS', this.fav_jobs);
		}
	}

	initJobDetail(job_id) {
		this.api.startQueue([
			this.api.getJobDetail(job_id),
		]).then(response => {
			let job = response[0];

			if (job && job.applications.length > 0) {
				let applied = _.filter(job.applications, {'applicant_user_id': Config.USER_AUTH.id});
				if (applied && applied.length > 0) {
					this.isApplied = true;
				}
			}

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
			let monthly_wage = job.monthly_wage;
			let hourly_wage = job.hourly_wage;
			switch(job.type) {
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

			switch(job.employer.scale) {
				case 'under_20':
					job.employer['scale_zh'] = '20人或以下';
					job.employer['scale_en'] = '20 people or below';
					break;
				case '21_100':
					job.employer.scale_zh = '21-100人';
					job.employer.scale_en = '20-100 people';
					break;
				case '101_500':
					job.employer.scale_zh = '101-500人';
					job.employer.scale_en = '101-500 people';
					break;
				case '501_1000':
					job.employer.scale_zh = '501-1000人';
					job.employer.scale_en = '501-1000 people';
					break;
				case 'above_1000':
					job.employer.scale_zh = '1000人以上';
					job.employer.scale_en = 'More than 1000 people';
					break;
			}
			
			this.job = job;
			console.log('job detail', this.job);
		});
	}

	applyJob(job_id) {
		this.utils.showConfirm('', this.utils.instantLang('MSG.APPLY_CONFIRM'), ()=>{
			this.api.startQueue([
				this.api.postApplicationApply(job_id)
			]).then(response => {
				let post_response = response[0];
	
				if (post_response['status']) {
					// Applied successful
					this.utils.showAlert('', this.utils.instantLang('MSG.APPLY_SUCCESS'));
				} else {
					// Apply failed
					this.utils.showAlert('', this.utils.instantLang('MSG.APPLY_FAILED'));
				}
				console.log('post_response', post_response);
			});
		})
	}

	cancelJob(job_id) {
		this.utils.showConfirm('', this.utils.instantLang('MSG.CANCEL_CONFIRM'), ()=>{
			this.api.startQueue([
				this.api.postApplicationCancel(job_id)
			]).then(response => {
				let post_response = response[0];
	
				// if (post_response['status']) {
				// 	// Applied successful
				// 	this.utils.showAlert('', this.utils.instantLang('MSG.APPLY_SUCCESS'));
				// } else {
				// 	// Apply failed
				// 	this.utils.showAlert('', this.utils.instantLang('MSG.APPLY_FAILED'));
				// }
				console.log('post_response', post_response);
			});
		})
	}
}