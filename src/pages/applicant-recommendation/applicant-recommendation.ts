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
		_.each(this.user_preference, (pref) => {
			// Key to match with job key
			let match_key = this.match.translatePrefKey(pref.value);
			// All preferences
			let match_all_value = this.match.translatePrefAllValue(pref.value);
			// User preferences that are selected
			let match_value = this.match.translatePrefValue(pref.value, pref.selection);
			// User preferences that are not selected
			let other_value = _.difference(match_all_value, match_value);

			if (pref.importance == 2) {
				// For fields considered as MUST
				let must_jobs = [];
				// Check if preference match with job, if not, filter from list
				_.each(match_value, (value) => {
					let matched_jobs = _.filter(this.all_jobs, function(job) {
						return job[match_key] == value;
					});
					must_jobs = _.concat(must_jobs, matched_jobs)
				})
				console.log('must_jobs', must_jobs);
			} else if (pref.importance == 1) {
				// For fields considered as PREFERRED
				let preferred_jobs = [];
				_.each(match_value, (value) => {
					// Place preferref jobs first, then the others
					let matched_jobs = _.partition(this.all_jobs, function(job) {
						return job[match_key] == value;
					});
					preferred_jobs = _.flatten(matched_jobs);
					console.log('preferred_jobs', preferred_jobs);
				})
			} else {

			}
		})
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