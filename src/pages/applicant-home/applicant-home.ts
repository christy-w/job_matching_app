import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { SearchFilter } from '../../components/search-filter/search-filter';
import { PreferenceModal } from '../../components/preference-modal/preference-modal';
import { Api } from '../../providers';
import _ from 'lodash';
import * as moment from 'moment';

@IonicPage()
@Component({
	selector: 'page-applicant-home',
	templateUrl: 'applicant-home.html'
})
export class ApplicantHomePage extends BasePage {

	name: string = 'ApplicantHomePage';
	language: string = '';
	jobs: any;

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('HomePage constructor');
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = 'home';
		this.checkUserPreference();
	}

	checkUserPreference() {
		this.utils.getLocal('USER_PREFERENCE').then(preference => {
			console.log('preference', preference);
			if (!preference) {
				this.utils.getLocal('USER_PREFERENCE_NEVER_SHOW').then(bool => {
					if (!bool) {
						this.utils.showModal(PreferenceModal, {}, {cssClass:'preference-modal'});
					}
				})
			}
		})
	}

	ngOnInit() {
		this.language = this.utils.currentLang();
		console.log('home > lang', this.language);

		this.api.startQueue([
			this.api.getAllJobs()
		]).then(response => {
			var all_jobs = response[0];

			// Default sort jobs by publish date
			all_jobs = _.filter(all_jobs, { 'status': 'active' });
			all_jobs = _.orderBy(all_jobs, function(job) { 
				return moment(job.publish_date); 
			}).reverse();

			all_jobs.forEach(job => {
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
			});

			this.jobs = all_jobs;

			// console.log('now', now);
			console.log('all jobs', this.jobs);
		});
	}

	openSearchFilter() {
		console.log('searchFilter');
		let searchFilter = this.utils.createPopover(SearchFilter, {}, {cssClass:'search-filter'});
		searchFilter.onDidDismiss(data => {
			(data) ? this.filterJobList(data) : searchFilter.dismiss();
		});
	    searchFilter.present();
	}

	openJobPage() {
		this.nav.push('ApplicantJobPage');
	}

	filterJobList(filters) {
		console.log('type filters', filters.types);
		console.log('district filters', filters.districts);
	}
}