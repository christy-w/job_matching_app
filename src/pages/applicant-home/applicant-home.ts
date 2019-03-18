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
import { ProfileModal } from '../../components/profile-modal/profile-modal';

@IonicPage()
@Component({
	selector: 'page-applicant-home',
	templateUrl: 'applicant-home.html'
})
export class ApplicantHomePage extends BasePage {

	name: string = 'ApplicantHomePage';
	language: string = '';
	jobs: any;
	filtered_jobs: any = [];
	all_jobs: any;
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
		this.checkUserProfile();
		this.checkUserPreference();
	}

	checkUserProfile() {
		// Check if User updated profile
		if (Config.USER_AUTH.info_updated == 0) {
			// If no update record, check if the user skips updating
			this.utils.getLocal('USER_PROFILE_NEVER_SHOW').then(bool => {
				if (!bool) {
					// If user did not skip, ask to update
					this.utils.showModal(ProfileModal, {}, {cssClass:'profile-modal'});
				}
			})
		}
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
			
			this.all_jobs = all_jobs;
			this.jobs = _.orderBy(this.all_jobs, function(job) { 
				return moment(job.publish_date); 
			}).reverse();
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

	openJobPage(job_id) {
		let data = { 'job_id': job_id };
		this.nav.push('ApplicantJobPage', data);
	}

	filterJobList(filters) {
		this.jobs = this.all_jobs;
		// Search by key words
		let searched_jobs = [];
		let key_word = filters.search_input.toLowerCase();
		if (key_word) {
			_.each(this.jobs, (job)=> {
				if (job.employer.name_zh.toLowerCase().includes(key_word)
					|| job.employer.name_en.toLowerCase().includes(key_word)
					|| job.name_zh.toLowerCase().includes(key_word)
					|| job.name_en.toLowerCase().includes(key_word)
				) {
					searched_jobs.push(job);
				}
			})
		} else {
			searched_jobs = this.jobs;
		}
		console.log('Searched: ', searched_jobs);

		// Search by type filter
		let type_filtered_jobs = [];
		let types = filters.types;
		if (types && types.length > 0) {
			_.each(types, (type) => {
				let type_matched_jobs = _.filter(searched_jobs, {'type': type});
				type_filtered_jobs.push(type_matched_jobs);
			})
			type_filtered_jobs = _.flatten(type_filtered_jobs);
		}
		console.log('Filtered by type: ', type_filtered_jobs);

		// Search by district filter
		let district_filtered_jobs = [];
		let districts = filters.districts;
		if (districts && districts.length > 0) {
			_.each(districts, (district) => {
				let district_matched_jobs = _.filter(type_filtered_jobs, {'district_id': district});
				district_filtered_jobs.push(district_matched_jobs);
			})
			district_filtered_jobs = _.flatten(district_filtered_jobs);
		}
		console.log('Filtered by district: ', district_filtered_jobs);

		this.jobs = _.orderBy(district_filtered_jobs, function(job) { 
			return moment(job.publish_date); 
		}).reverse();
	}
}