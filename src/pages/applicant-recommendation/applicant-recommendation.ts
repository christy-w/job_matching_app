import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';

@IonicPage()
@Component({
	selector: 'page-applicant-recommendation',
	templateUrl: 'applicant-recommendation.html'
})
export class ApplicantRecommendationPage extends BasePage {

	name: string = 'ApplicantRecommendationPage';
	recommendations: any = [];
	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils
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
				match_marks: "8/10",
				match_item: [
					{}
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
				match_marks: "8/10",
				match_item: [
					{}
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
				match_marks: "8/10",
				match_item: [
					{}
				]
			},

		];
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = 'recommendation';
	}

	
}