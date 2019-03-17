import { Component, ViewChild } from '@angular/core';
import { Platform, ViewController, NavController, Slides, NavParams } from 'ionic-angular';
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
	selector: 'page-employer-recommendation',
	templateUrl: 'employer-recommendation.html'
})
export class EmployerRecommendationPage extends BasePage {
	@ViewChild('cardSlider') slides: Slides;

	name: string = 'EmployerRecommendationPage';
	user_preference: any;
	applications: any;

	recommendations: any = [];
	

	must_applicants: any = [];
	preferred_applicants: any = [];
	other_jobs: any = [];
	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api,
		private match: Match,
		private params: NavParams
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('EmployerRecommendationPage constructor');
		
		let job_id = this.params.get('job_id');
		this.initApplications(job_id);
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = 'recommendation';
	}

	initRecommendations() {
		// Pick MUST fulfilled preferences
		let must_pref = _.filter(this.user_preference, {'importance':2})
		console.log('must_pref', must_pref);

		let preferred_pref = _.filter(this.user_preference, {'importance':1});
		console.log('preferred_pref', preferred_pref);

		// Get jobs fulfilled MUST condition
		if (must_pref && must_pref.length > 0) {
			this.getMustApplicants(must_pref);
		} else if (preferred_pref && preferred_pref.length > 0){
			this.getPreferredApplicants(preferred_pref)
		} else {
			console.log('initRecommendations > no pref');
			this.user_preference = null;
		}
	}

	getMustApplicants(must_pref) {
		// For multi-select typed pref
		let must_selects_pref = _.filter(must_pref, {'field_type': 'multi_select'});

		if (must_selects_pref && must_selects_pref.length > 0) {
			this.getMustSelects(must_selects_pref);
		}

		if (this.checkLength(this.must_applicants)) {
			// Pick PREFFERED to fulfilled preferences
			let preferred_pref = _.filter(this.user_preference, {'importance':1});
			console.log('preferred_pref', preferred_pref);
			
			if (preferred_pref && preferred_pref.length > 0) {
				this.getPreferredApplicants(preferred_pref);
			} else {
				this.recommendations = this.must_applicants;
				this.reformatRecommendations();
				console.log('Recommended from Must jobs (<10)', this.recommendations);
			}
		} else {
			this.recommendations = _.take(this.must_applicants, 10);
			this.reformatRecommendations();
			console.log('Recommended from 10 Must jobs', this.recommendations);
		}
	}

	getPreferredApplicants(preferred_pref) {
		// For multi-select typed pref
		let preferred_selects_pref = _.filter(preferred_pref, {'field_type': 'multi_select'});
		let preferred_input_pref = _.filter(preferred_pref, {'field_type': 'input'});

		if (preferred_selects_pref && preferred_selects_pref.length > 0) {
			this.getPreferredSelects(preferred_selects_pref);
		}

		if (this.checkLength(this.preferred_applicants)) {
			this.recommendations = this.preferred_applicants;
			this.reformatRecommendations();
			console.log('Recommended from Preferred jobs (<10)', this.recommendations);
		} else {
			this.recommendations = _.take(this.preferred_applicants, 10);
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
				re['match_level_en'] = 'Highly Matched'
			} else {
				re['match_level_zh'] = '符合',
				re['match_level_en'] = 'Matched'
			}

			_.each(re['match_item'], (match_item) => {
				switch (match_item.name) {
					case 'gender':
						match_item.name_zh = '性別';
						match_item.name_en = 'Gender Type';
						break;
					case 'education_level':
						match_item.name_zh = '教育程度';
						match_item.name_en = 'Education Level';
						break;
					case 'related_experience':
						match_item.name_zh = '相關工作經驗';
						match_item.name_en = 'Related Experiences';
						break;
				};
			});

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
		});
		this.recommendations = _.orderBy(this.recommendations, ['match_num'], ['desc']);
	}

	getMustSelects(must_selects_pref) {
		_.each(must_selects_pref, (pref) => {
			// Key to match with job key
			let match_key = this.match.translatePrefKey(pref.value);
			// User preferences that are selected
			let match_value = this.match.translatePrefValue(pref.value, pref.selection);
			console.log('mustSelects > match_value', match_value);
			// Check if preference match with job, if not, filter from list
			let must_jobs_per_pref = [];
			_.each(match_value, (value) => {

				let field_content = this.match.translatePrefContent(pref.value, value);
				let matched_jobs_per_pref = _.filter(this.applications, function(job) {
					if (!job.match_item) {
						job.match_item = [];
					}
					if (job.applicant[match_key] == value) {
						job.match_item.push({ 'name': match_key, 'content': field_content, 'importance': 2 });
					}
					return job.applicant[match_key] == value;
				});
				// console.log('matched', matched_jobs_per_pref);
				must_jobs_per_pref = _.concat(must_jobs_per_pref, matched_jobs_per_pref)
			})
			this.must_applicants = must_jobs_per_pref;
		});
		console.log('multi-select must_applicants', this.must_applicants);
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
				let matched_jobs_per_pref = _.partition(this.must_applicants, function(job) {
					if (!job.match_item) {
						job.match_item = [];
					}
					if (job.applicant[match_key] == value) {
						job.match_item.push({ 'name': match_key, 'content': field_content, 'importance': 1 });
					}
					return job.applicant[match_key] == value;
				});
				preferred_jobs_per_pref = _.flatten(matched_jobs_per_pref);
			})
			this.preferred_applicants = preferred_jobs_per_pref;
			console.log('preferred_jobs', this.preferred_applicants);
		})
	}

	checkLength(sort_list) {
		if (sort_list.length > 10)
			return false; 
		return true;
	}
	
	initApplications(job_id) {
		this.api.startQueue([
			this.api.getJobApplications(job_id)
		]).then(response => {
			this.applications = response[0];
	
			if (this.applications) {
				console.log('applications', this.applications);
				// Check if user has saved pref
				this.utils.getLocal('USER_PREFERENCE').then(pref => {
					if (pref && pref != null) {
						this.user_preference = pref;
						this.initRecommendations();
						console.log('User saved preference', this.user_preference);
					} else {
						this.user_preference = null;
						this.recommendations = this.applications;
						console.log('No preference');
					}
				})
			}
		});
	}

	seeDetail(applicant_id) {
		let data = { 'applicant_id': applicant_id };
		this.nav.push('CandidateProfilePage', data);
	}

	hireApplicant(applicantion_id) {

	}

	goSettingPage() {
		this.nav.setRoot('EmployerProfilePage');
	}
}