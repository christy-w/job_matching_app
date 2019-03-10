import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';
import { Match } from '../../providers';

import _ from 'lodash';
@IonicPage()
@Component({
	selector: 'page-applicant-recommendation',
	templateUrl: 'applicant-recommendation.html'
})
export class ApplicantRecommendationPage extends BasePage {

	name: string = 'ApplicantRecommendationPage';
	user_preference: any;
	all_jobs: any;
	recommendations: any = [];

	must_pref: any = [];
	preferred_pref: any = [];
	other_pref: any = [];



	must_jobs: any = [];
	preferred_jobs: any = [];
	other_jobs: any = [];
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

		this.recommendations = [
			{
				name: "臨時保安員",
				job_type: "臨時工作",
				employer_name: "太平洋酒店",
				salary: "$55/小時",
				tags: ["即日出糧","優秀僱主"],
				publish_date: "1日前",
				thumbnail_url: "",
				match_mark: "5",
				total_mark: "8",
				match_level: "極符合",
				match_items: [
					{
						name: "工作類別",
						content: "臨時工作"
					},
					{
						name: "工作地點",
						content: "油尖旺區"
					},
					{
						name: "最低薪酬",
						content: "$65/小時"
					},
					{
						name: "工作時間",
						content: "早上"
					},
					{
						name: "工作日期",
						content: "星期六"
					},
					{
						name: "出糧方式",
						content: "現金出糧"
					},
					{
						name: "出糧日期",
						content: "即日"
					},
					{
						name: "僱主評分",
						content: "4.6分"
					},
				]
			},
			{
				name: "臨時保安員",
				job_type: "臨時工作",
				employer_name: "太平洋酒店",
				salary: "$55/小時",
				tags: ["即日出糧","優秀僱主"],
				publish_date: "1日前",
				thumbnail_url: "",
				match_mark: "3",
				total_mark: "8",
				match_level: "符合",
				match_items: [
					{
						name: "工作類別",
						content: "臨時工作"
					},
					{
						name: "工作地點",
						content: "油尖旺區"
					},
					{
						name: "最低薪酬",
						content: "$65/小時"
					},
				]
			},
			{
				name: "臨時保安員",
				job_type: "臨時工作",
				employer_name: "太平洋酒店",
				salary: "$55/小時",
				tags: ["即日出糧","優秀僱主"],
				publish_date: "1日前",
				thumbnail_url: "",
				match_mark: "4",
				total_mark: "8",
				match_level: "符合",
				match_items: [
					{
						name: "工作類別",
						content: "臨時工作"
					},
					{
						name: "工作地點",
						content: "油尖旺區"
					},
					{
						name: "最低薪酬",
						content: "$65/小時"
					},
					{
						name: "工作時間",
						content: "早上"
					},
				]
			},

		];
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = 'recommendation';
		this.getUserPreference();
	}

	getUserPreference() {
		this.utils.getLocal('USER_PREFERENCE').then(pref => {
			if (pref && pref != null) {
				this.user_preference = pref;
				this.initAllJobs();
				console.log('User saved preference', this.user_preference);
			} else {
				this.user_preference = null;
				console.log('No preference');
			}
		})
	}

	initRecommendations() {
		// Pick MUST fulfilled preferences
		let must_pref = _.filter(this.user_preference, {'importance':2})
		console.log('must_pref', must_pref);

		let preferred_pref = _.filter(this.user_preference, {'importance':1});
		console.log('preferred_pref', preferred_pref);

		// Get jobs fulfilled MUST condition
		if (must_pref && must_pref.length > 0) {
			this.getMustJobs(must_pref);
		} else if (preferred_pref && preferred_pref.length > 0){
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
			this.getMustSelects(must_selects_pref);
			if (must_input_pref && must_input_pref.length > 0) {
				this.getMustInput(must_input_pref);
			}
		} else if (must_input_pref && must_input_pref.length > 0){
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
				console.log('Recommended from Must jobs (<10)', this.recommendations);
			}
		} else {
			this.recommendations = _.take(this.must_jobs, 10);
			console.log('Recommended from 10 Must jobs', this.recommendations);
		}
	}

	getMustSelects(must_selects_pref) {
		_.each(must_selects_pref, (pref) => {
			// Key to match with job key
			let match_key = this.match.translatePrefKey(pref.value);
			// User preferences that are selected
			let match_value = this.match.translatePrefValue(pref.value, pref.selection);

			// Check if preference match with job, if not, filter from list
			let must_jobs_per_pref = [];
			_.each(match_value, (value) => {
				// console.log('value', value);
				let matched_jobs_per_pref = _.filter(this.all_jobs, function(job) {
					if (!job.match_item) {
						job.match_item = [];
					}
					if (job[match_key] == value) {
						job.match_item.push({ 'name': match_key, 'content': value, 'importance': 2 });
					}
					return job[match_key] == value;
				});
				// console.log('matched', matched_jobs_per_pref);
				must_jobs_per_pref = _.concat(must_jobs_per_pref, matched_jobs_per_pref)
			})
			this.must_jobs = must_jobs_per_pref;
		});
		console.log('multi-select must_jobs', this.must_jobs);
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
				// Place preferref jobs first, then the others
				let matched_jobs_per_pref = _.partition(this.must_jobs, function(job) {
					if (!job.match_item) {
						job.match_item = [];
					}
					if (job[match_key] == value) {
						job.match_item.push({ 'name': match_key, 'content': value, 'importance': 1 });
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

	}

	checkLength(job_list) {
		if (job_list.length > 10)
			return false; 
		return true;
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