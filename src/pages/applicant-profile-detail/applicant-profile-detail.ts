import { Component } from '@angular/core';
import { Platform, ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import _ from 'lodash';
import { Api } from '../../providers';

@IonicPage()
@Component({
	selector: 'page-applicant-profile-detail',
	templateUrl: 'applicant-profile-detail.html'
})
export class ApplicantProfileDetailPage extends BasePage {

	name: string = 'ApplicantProfileDetailPage';
	detail_type: string = '';
	user_profile: any;
	detail_fields: any;

	language_abilities: any;
	computer_skills: any;
	related_certs: any;

	selected_languages: any;
	selected_skills: any;
	selected_certs: any;
	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private params: NavParams,
		private api: Api
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('ApplicantProfileDetailPage constructor');
		
		this.detail_type = this.params.get('content');
		console.log('detail', this.detail_type);
	}

	ngOnInit() {
		this.initSkillsArrays();
		// this.renderUserProfile();
		this.language = this.utils.currentLang();
	}

	initSkillsArrays() {
		this.api.startQueue([
			this.api.getSystemInfo('language_abilities'),
			this.api.getSystemInfo('computer_skills'),
			this.api.getSystemInfo('related_certificates'),
			this.api.getApplicantProfile()
		]).then(response => {
			this.language_abilities = response[0];
			this.computer_skills = _.filter(response[1], { 'status': 'active'});
			this.related_certs = _.filter(response[2], { 'status': 'active'});
			this.user_profile = response[3];

			// Inif profile fields after getting user profile;
			this.initProfileFields();
			console.log('user_profile', this.user_profile);
		});
	}


	initProfileFields() {
		switch(this.detail_type) {
			case 'personal_details': 
				this.detail_fields = [
					{
						name_zh: "中文姓名",
						name_en: "Chinese Name",
						type: "name_zh",
						required: true,
						field_type: "input", // input/select/multi_select/date/
						selection: '',
						options: []
					},
					{
						name_zh: "英文姓名",
						name_en: "English Name",
						type: "name_en",
						required: true,
						field_type: "input", // input/select/multi_select/date/
						selection: '',
						options: []
					},
					{
						name_zh: "電郵",
						name_en: "Email",
						type: "email",
						required: true,
						field_type: "input", // input/select/multi_select/date/
						selection: '',
						options: []
					},
					{
						name_zh: "性別",
						name_en: "Gender",
						type: "gender",
						required: true,
						field_type: "select", // input/select/multi_select/date/
						selection: '',
						options: [
							{
								name_zh: '男',
								name_en: 'Male',
								value: 'male'
							},
							{
								name_zh: '女',
								name_en: 'Female',
								value: 'female'
							}
						]
					},
					{
						name_zh: "出生日期",
						name_en: "Date of Birth",
						type: "dob",
						required: true,
						field_type: "date", // input/select/multi_select/date/
						selection: '',
						options: []
					},
				];
				break;
			case 'work_experiences':
				this.detail_fields = [
					{
						name_zh: "教育程度",
						name_en: "Education Level",
						type: "education_level",
						required: true,
						field_type: "select", // input/select/multi_select/date/
						selection: '',
						options: [
							{
								name_zh: '從未',
								name_en: 'Never',
								value: 'never'
							},
							{
								name_zh: '小學或以下',
								name_en: 'Primary school or below',
								value: 'primary'
							},
							{
								name_zh: '中學',
								name_en: 'Secondary school',
								value: 'secondary'
							},
							{
								name_zh: '大專 / 副學士 / 文憑',
								name_en: 'Post-secondary school / Associate Degree / Diploma',
								value: 'post_secondary'
							},
							{
								name_zh: '大學或以上',
								name_en: 'University or above',					
								value: 'university'
							}
						]
					},
					{
						name_zh: "職業狀況",
						name_en: "Employment Status",
						type: "employment_status",
						required: true,
						field_type: "select", // input/select/multi_select/date/
						selection: '',
						options: [
							{
								name_zh: '全職',
								name_en: 'Full Time',
								value: 'full_time'
							},
							{
								name_zh: '兼職',
								name_en: 'Part Time',
								value: 'part_time'
							},
							{
								name_zh: '自僱',
								name_en: 'Self Employed',
								value: 'self_employed'
							},
							{
								name_zh: '主婦',
								name_en: 'Home maker',
								value: 'home_maker'
							},
							{
								name_zh: '待業',
								name_en: 'Unemployed',
								value: 'unemployed'
							},
							{
								name_zh: '學生',
								name_en: 'Student',
								value: 'student'
							},
						]
					},
					{
						name_zh: "相關工作經驗",
						name_en: "Related Experiences",
						type: "related_experience",
						required: true,
						field_type: "select", // input/select/multi_select/date/
						selection: '',
						options: [	
							{
								name_zh: '沒有經驗',
								name_en: 'None',
								value: 'none'
							},
							{
								name_zh: '半年或以內',
								name_en: '6 months or less',
								value: 'half_year'
							},
							{
								name_zh: '半年至1年',
								name_en: '6 months to 1 year',
								value: '1_year'
							},
							{
								name_zh: '1年至3年',
								name_en: '1 year to 3 years',
								value: '3_year'
							},
							{
								name_zh: '3年以上',
								name_en: '3 years of more',
								value: '3_year_above'
							}
						]
					},
				];
				break;
		}


		if (this.user_profile) {
			this.renderUserProfile();
		}
	}

	renderUserProfile() {
		switch(this.detail_type) {
			case 'personal_details':
			case 'work_experiences':
				for (let i=0; i<this.detail_fields.length; i++) {
					// Put saved data into saving fields;
					var type = this.detail_fields[i].type;
					var value = this.user_profile[type];
					this.detail_fields[i].selection = value;
				}
				break;
			case 'skills_certificates':
				this.selected_languages = this.user_profile.language_abilities;
				this.selected_skills = this.user_profile.computer_skills;
				this.selected_certs = this.user_profile.related_certs;
				break;
		}
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = '';
	}
}