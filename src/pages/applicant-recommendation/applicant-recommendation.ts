import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';

@IonicPage()
@Component({
	selector: 'page-applicant-recommendation',
	templateUrl: 'applicant-recommendation.html'
})
export class ApplicantRecommendationPage extends BasePage {

	name: string = 'ApplicantRecommendationPage';
	user_preference: any;
	recommendations: any = [];
	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api
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
		this.initAllJobs();
		this.getUserPreference();
	}

	getUserPreference() {
		this.utils.getLocal('USER_PREFERENCE').then(pref => {
			if (pref && pref != null) {
				this.user_preference = pref;
				console.log('User saved preference', this.user_preference);
			} else {
				this.user_preference = null;
				console.log('No preference');
			}
		})
	}
	
	initAllJobs() {
		this.api.startQueue([
			this.api.getAllJobs()
		]).then(response => {
			let all_jobs = response[0];
		});
	}

	goSettingPage() {
		this.nav.setRoot('ApplicantProfilePage');
	}
}