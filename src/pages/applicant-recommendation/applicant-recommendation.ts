import { Component, ViewChild } from '@angular/core';
import { Platform, ViewController, NavController, Slides } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';
import { Match } from '../../providers';
import * as moment from 'moment';

import _ from 'lodash';
@IonicPage()
@Component({
	selector: 'page-applicant-recommendation',
	templateUrl: 'applicant-recommendation.html'
})
export class ApplicantRecommendationPage extends BasePage {
	@ViewChild('cardSlider') slides: Slides;

	name: string = 'ApplicantRecommendationPage';
	user_preference: any;
	all_jobs: any;
	recommendations: any = [];
	fav_jobs: any;
	must_jobs: any = [];
	preferred_jobs: any = [];
	other_jobs: any = [];
	language: string = '';
	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api,
		private match: Match
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('ApplicantRecommendationPage constructor');
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = 'recommendation';
		this.language = this.utils.currentLang();
		this.getUserPreference();
		this.getFavourited();
	}

	getUserPreference() {
		this.utils.getLocal('USER_PREFERENCE').then(pref => {
			if (pref && pref != null) {
				this.user_preference = pref;
				this.initAllJobs();
				console.log('User saved preference', this.user_preference);
			} else {
				this.user_preference = null;
				console.log('No preferences yet');
			}
		})
	}

	initRecommendations() {
		// Pick MUST fulfilled preferences
		let must_pref = _.filter(this.user_preference, {'importance':2})
		console.log('must_pref', must_pref);

		// Pick PREFERRED fulfilled preferences
		let preferred_pref = _.filter(this.user_preference, {'importance':1});
		console.log('preferred_pref', preferred_pref);

		if (must_pref && must_pref.length > 0) {
			// Get jobs fulfilled MUST condition
			this.getMustJobs(must_pref);
		} else if (preferred_pref && preferred_pref.length > 0){
			// Get jobs fulfilled PREFERRED condition
			this.must_jobs = this.all_jobs;
			this.getPreferredJobs(preferred_pref)
		} else {
			console.log('initRecommendations > no pref');
			this.user_preference = null;
		}
	}

	getMustJobs(must_pref) {
		// For multi-select typed pref
		let must_selects_pref = _.filter(must_pref, {'field_type': 'multi_select'});
		let must_input_pref = _.filter(must_pref, {'field_type': 'input'});

		if (must_selects_pref && must_selects_pref.length > 0) {
			// If both "select" and "input" preferences are set.
			// Get results by "select" type preference first
			this.getMustSelects(must_selects_pref);
			if (must_input_pref && must_input_pref.length > 0) {
				// Then the results by "input" type preference
				this.getMustInput(must_input_pref);
			}
		} else if (must_input_pref && must_input_pref.length > 0){
			// If only "input" preferences are set.
			this.getMustInput(must_input_pref);
		}

		if (this.checkLength(this.must_jobs)) {
			// Pick PREFFERED to fulfilled preferences
			let preferred_pref = _.filter(this.user_preference, {'importance':1});
			console.log('preferred_pref', preferred_pref);
			
			if (preferred_pref && preferred_pref.length > 0) {
				this.getPreferredJobs(preferred_pref);
			} else {
				this.recommendations = this.must_jobs;
				this.reformatRecommendations();
				console.log('Recommended from Must jobs (<10)', this.recommendations);
			}
		} else {
			this.recommendations = _.take(this.must_jobs, 10);
			this.reformatRecommendations();
			console.log('Recommended from 10 Must jobs', this.recommendations);
		}
	}

	getPreferredJobs(preferred_pref) {
		// For multi-select typed pref
		let preferred_selects_pref = _.filter(preferred_pref, {'field_type': 'multi_select'});
		let preferred_input_pref = _.filter(preferred_pref, {'field_type': 'input'});

		if (preferred_selects_pref && preferred_selects_pref.length > 0) {
			this.getPreferredSelects(preferred_selects_pref);
			if (preferred_input_pref && preferred_input_pref.length > 0) {
				this.getPreferredInput(preferred_input_pref);
			}
		} else if (preferred_input_pref && preferred_input_pref.length > 0){
			this.getPreferredInput(preferred_input_pref);
		}

		if (this.checkLength(this.preferred_jobs)) {
			this.recommendations = this.preferred_jobs;
			this.reformatRecommendations();
			console.log('Recommended from Preferred jobs (<10)', this.recommendations);
		} else {
			this.recommendations = _.take(this.preferred_jobs, 10);
			this.reformatRecommendations();
			console.log('Recommended from 10 Preferred jobs', this.recommendations);
		}
	}

	reformatRecommendations() {
		let saved_preference_num = _.filter(this.user_preference, function(o) {
			return o.importance != 0;
		}).length;

		_.each(this.recommendations, (re) => {
			re['match_total_num'] = saved_preference_num;
			re['match_num'] = re['match_item'].length;
			let level = re['match_num'] / saved_preference_num;
			if (level > 0.5) {
				re['match_level_zh'] = '極符合',
				re['match_level_en'] = 'Highly Matches'
			} else {
				re['match_level_zh'] = '符合',
				re['match_level_en'] = 'Matches'
			}

			_.each(re['match_item'], (match_item) => {
				switch (match_item.name) {
					case 'type':
						match_item.name_zh = '工作類別';
						match_item.name_en = 'Employment Type';
						break;
					case 'monthly_wage':
						match_item.name_zh = '最低月薪薪酬';
						match_item.name_en = 'Minimum Monthly Salary';
						break;
					case 'hourly_wage':
						match_item.name_zh = '最低時薪薪酬';
						match_item.name_en = 'Minimum Hourly Salary';
						break;
					case 'payment_method':
						match_item.name_zh = '出糧方式';
						match_item.name_en = 'Payment Methods';
						break;
				};
			});

			// Format publish dates
			let publish_date = moment(re.publish_date,'YYYY-MM-DD HH:mm:ss');
			var diff_days = moment().diff(publish_date, 'days');
			if (diff_days == 0) {
				re.diff_days_zh = '今天';
				re.diff_days_en = 'Today';
			} else if (diff_days > 0){
				re.diff_days_zh = diff_days + '日前';
				re.diff_days_en = diff_days + ' days ago';
			}

			// Format job type and wage
			let monthly_wage = re.monthly_wage;
			let hourly_wage = re.hourly_wage;
			switch(re.type) {
				case 'fulltime':
					re.type_zh = '全職';
					re.type_en = 'Full Time';
					re.wage_zh = '$' + monthly_wage + '/月';
					re.wage_en = '$' + monthly_wage + '/Month';
					break;
				case 'parttime':
					re.type_zh = '兼職';
					re.type_en = 'Part Time';
					re.wage_zh = '$' + hourly_wage + '/小時';
					re.wage_en = '$' + hourly_wage + '/Hour';
					break;
				case 'temporary':
					re.type_zh = '臨時工作';
					re.type_en = 'Temporary Work';
					re.wage_zh = '$' + hourly_wage + '/小時';
					re.wage_en = '$' + hourly_wage + '/Hour';
					break;
			}

			switch(re.employer.scale) {
				case 'under_20':
					re.employer['scale_zh'] = '20人或以下';
					re.employer['scale_en'] = '20 people or below';
					break;
				case '21_100':
					re.employer.scale_zh = '21-100人';
					re.employer.scale_en = '20-100 people';
					break;
				case '101_500':
					re.employer.scale_zh = '101-500人';
					re.employer.scale_en = '101-500 people';
					break;
				case '501_1000':
					re.employer.scale_zh = '501-1000人';
					re.employer.scale_en = '501-1000 people';
					break;
				case 'above_1000':
					re.employer.scale_zh = '1000人以上';
					re.employer.scale_en = 'More than 1000 people';
					break;
			}
		});
		this.recommendations = _.orderBy(this.recommendations, ['match_num'], ['desc']);
	}

	getMustSelects(must_selects_pref) {
		_.each(must_selects_pref, (pref) => {
			// Preference Key e.g. employment_type
			let match_key = this.match.translatePrefKey(pref.value);
			// Preferred value e.g. 'fulltime'
			let match_value = this.match.translatePrefValue(pref.value, pref.selection);

			// Look through all jobs and search for job matches with this preference. If not, filter from list
			let must_jobs_per_pref = [];
			_.each(match_value, (value) => {
				// Get Preferred value with details
				// e.g. { name_zh: '全職', name_en: 'Fulltime', value: 'fulltime' }
				let field_content = this.match.translatePrefContent(pref.value, value);
				let matched_jobs_per_pref = _.filter(this.all_jobs, function(job) {
					if (!job.match_item) {
						job.match_item = [];
					}
					// Record the matching items to the resulting object
					if (job[match_key] == value) {
						job.match_item.push({ 'name': match_key, 'content': field_content, 'importance': 2 });
					}
					return job[match_key] == value;
				});
				// Merge the results together
				must_jobs_per_pref = _.concat(must_jobs_per_pref, matched_jobs_per_pref)
			})
			this.must_jobs = must_jobs_per_pref;
		});
		console.log('Jobs resulting from MUST preference(multi-select)', this.must_jobs);
	}

	getMustInput(must_input_pref) {
		let ft_above_wage = [];
		let non_ft_above_wage = [];
		_.each(must_input_pref, (pref) => {
			// Key to match with job key
			let match_key = this.match.translatePrefKey(pref.value);
			let match_value = pref.selection;
			let reformatted_ft_jobs = _.partition(this.must_jobs, {'type': 'fulltime'})[0];
			let reformatted_non_ft_jobs = _.partition(this.must_jobs, {'type': 'fulltime'})[1];

			ft_above_wage =  _.filter(reformatted_ft_jobs, function(o) {
				if (match_key == 'monthly_wage') {

					o['match_item'].push({ 'name': 'monthly_wage', 'content': match_value, 'importance': 2 });
				}
				return o['monthly_wage'] >= match_value;
			})

			ft_above_wage = _.orderBy(ft_above_wage, ['monthly_wage'], ['desc']);
			console.log('ft_above_wage', ft_above_wage);

			non_ft_above_wage =  _.filter(reformatted_non_ft_jobs, function(o) {
				if (match_key == 'hourly_wage') {
					o['match_item'].push({ 'name': 'hourly_wage', 'content': match_value, 'importance': 2 });
				}
				return o['hourly_wage'] >= match_value;
			})

			non_ft_above_wage = _.orderBy(non_ft_above_wage, ['hourly_wage'], ['desc']);
			console.log('non_ft_above_wage', non_ft_above_wage);
		})
		this.must_jobs = _.concat(ft_above_wage, non_ft_above_wage);
		console.log('input must_jobs', this.must_jobs);
	}

	getPreferredSelects(preferred_selects_pref) {
		_.each(preferred_selects_pref, (pref) => {
			// Key to match with job key
			let match_key = this.match.translatePrefKey(pref.value);
			// User preferences that are selected
			let match_value = this.match.translatePrefValue(pref.value, pref.selection);

			// Check if preference match with job, if not, filter from list
			let preferred_jobs_per_pref = [];
			// For fields considered as PREFERRED
			_.each(match_value, (value) => {
				let field_content = this.match.translatePrefContent(pref.value, value);
				// Place preferref jobs first, then the others
				let matched_jobs_per_pref = _.partition(this.must_jobs, function(job) {
					if (!job.match_item) {
						job.match_item = [];
					}
					if (job[match_key] == value) {
						job.match_item.push({ 'name': match_key, 'content': field_content, 'importance': 1 });
					}
					return job[match_key] == value;
				});
				preferred_jobs_per_pref = _.flatten(matched_jobs_per_pref);
			})
			this.preferred_jobs = preferred_jobs_per_pref;
			console.log('preferred_jobs', this.preferred_jobs);
		})
	}
 
	getPreferredInput(preferred_input_pref) {
		let reformatted_ft_jobs = [];
		let reformatted_non_ft_jobs = [];
		let temp;
		if (this.preferred_jobs.length == 0) {
			temp = this.must_jobs;
		} else {
			temp = this.preferred_jobs;
		}
		_.each(preferred_input_pref, (pref) => {
			let match_key = this.match.translatePrefKey(pref.value);
			let match_value = pref.selection;
			reformatted_ft_jobs = _.partition(temp, {'type': 'fulltime'})[0];
			reformatted_non_ft_jobs = _.partition(temp, {'type': 'fulltime'})[1];

			_.each(reformatted_ft_jobs, (ft_job) => {
				if (match_key == 'monthly_wage' && ft_job['monthly_wage'] >= match_value) {
					ft_job['match_item'].push({ 'name': 'monthly_wage', 'content': match_value, 'importance': 1 });
				}
			})

			_.each(reformatted_non_ft_jobs, (non_ft_job) => {
				if (match_key == 'hourly_wage' && non_ft_job['hourly_wage'] >= match_value) {
					non_ft_job['match_item'].push({ 'name': 'hourly_wage', 'content': match_value, 'importance': 1 });
				}
			})
		})
		this.preferred_jobs = _.concat(reformatted_ft_jobs, reformatted_non_ft_jobs);
		console.log('input preferred_jobs', this.preferred_jobs);
	}

	checkLength(job_list) {
		if (job_list.length > 10)
			return false; 
		return true;
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

	flip(job) {
		if (job.flipped) {
			this.openJobPage(job.id);
		} else {
			job.flipped = !job.flipped;
		}
	}

	openJobPage(job_id) {
		let data = { 'job_id': job_id };
		this.nav.push('ApplicantJobPage', data);
	}
	
	initAllJobs() {
		this.api.startQueue([
			this.api.getAllJobs()
		]).then(response => {
			this.all_jobs = response[0];
	
			if (this.all_jobs) {
				this.initRecommendations();
			}
		});
	}

	goSettingPage() {
		this.nav.setRoot('ApplicantProfilePage');
	}
}