import { Component, ViewChild } from '@angular/core';
import { Utils } from '../../core/providers/utils';
import { ViewController, Slides } from 'ionic-angular';
import _ from 'lodash';
import { Api } from '../../providers';

@Component({
  selector: 'profile-modal',
  templateUrl: 'profile-modal.html'
})
export class ProfileModal {
	@ViewChild('profileSlider') slides: Slides;
	
	language: string = '';
	settings_steps: any = [];
	update_info_model: any = {};
	update_data: any = {};

	language_abilities: any;
	computer_skills: any;
	related_certs: any;

	constructor(
		private utils: Utils, 
		private view: ViewController,
		private api: Api
	) {
	}

	ngOnInit() {
		this.language = this.utils.currentLang();
		this.initPreferenceArrays();
		this.initSkillsArrays();
	}

	initPreferenceArrays() {
		this.settings_steps = [
			{
				name_zh: "個人資料",
				name_en: "Personal Details",
				type: "personal_details",
				fields: [
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
					// {
					// 	name_zh: "居住地區",
					// 	name_en: "Living District",
					// 	type: "district_id",
					// 	required: true,
					// 	field_type: "multi_select", // input/select/multi_select/date/
					// 	selection: '',
					// 	options: []
					// }
				]
			},
			{
				name_zh: "工作經驗",
				name_en: "Work Experiences",
				type: "work_experiences",
				fields: [
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
				]
			}
		];
	}

	initSkillsArrays() {
		this.api.startQueue([
			this.api.getSystemInfo('language_abilities'),
			this.api.getSystemInfo('computer_skills'),
			this.api.getSystemInfo('related_certificates')
		]).then(response => {
			this.language_abilities = response[0];
			this.computer_skills = _.filter(response[1], { 'status': 'active'});
			this.related_certs = _.filter(response[2], { 'status': 'active'});

			console.log('language_abilities', this.language_abilities);
			console.log('computer_skills', this.computer_skills);
			console.log('related_certs', this.related_certs);
		});
	}
	
	dismissModal() {
		this.view.dismiss();
		this.utils.setLocal('USER_PREFERENCE_NEVER_SHOW', true);
	}

	goNextSection(step) {
		console.log('step', step);
		let return_data = {}; 
		_.each(step.fields, (field) => {
			return_data[field.type] = field.selection;
		})
		_.extend(this.update_data, return_data);
		this.slides.slideNext();
	}

	sendUpdateInfo(languages, computer_skills, certs) {
		let skills = {
			computer_skills: computer_skills,
			language_abilities: languages,
			related_certs: certs
		};
		_.extend(this.update_data, skills);
		console.log('update_data', this.update_data);

		this.api.startQueue([
			this.api.postUpdateApplicant(this.update_data)
		]).then(response => {
			let update_response = response[0];

			// Successful update
			if (update_response == 1) {
				this.view.dismiss();
				this.utils.setLocal('USER_PROFILE_NEVER_SHOW', true);
			}
		});
	}
}
