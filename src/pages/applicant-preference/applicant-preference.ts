import { Component } from '@angular/core';
import { Platform, ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import _ from 'lodash';

@IonicPage()
@Component({
	selector: 'page-applicant-preference',
	templateUrl: 'applicant-preference.html'
})
export class ApplicantPreferencePage extends BasePage {

	name: string = 'ApplicantPreferencePage';
	setting_fields: any = [];
	preference_fields: any = [];
	preference_options: any = {};
	edit_mode: boolean = false;
	saved_preferences: any;
	show_msg: boolean = false;

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private params: NavParams
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('ApplicantPreferencePage constructor');
	}

	ngOnInit() {
		this.initPreferenceArrays();
		this.edit_mode = false;

		this.checkUserPreference();
	}

	initPreferenceArrays() {
		this.preference_options = [
			{	
				id: 0,
				name_zh: '毋須',
				name_en: 'None'
			},
			{
				id: 1,
				name_zh: '優先',
				name_en: 'Preferred'
			},
			{
				id: 2,
				name_zh: '必要',
				name_en: 'Must'
			}
		];
		
		this.preference_fields = [
			{
				name_zh: '工作類別',
				name_en: 'Employment Type',
				field_type: 'multi_select',
				selection: [],
				importance: 1,
				options: [
					{
						id: 0,
						option_zh: '全職',
						option_en: 'Full time',
						value: 'fulltime'
					},
					{
						id: 1,
						option_zh: '兼職',
						option_en: 'Part time',
						value: 'parttime'
					},
					{
						id: 2,
						option_zh: '臨時工作',
						option_en: 'Temporary work',
						value: 'temporary'
					},
					{
						id: 3,
						option_zh: '自由工作',
						option_en: 'Freelance',
						value: 'freelance'
					}
				]
			},
			// {
			// 	name_zh: '工作地區',
			// 	name_en: 'Work Location',
			// 	field_type: 'multi_select',
			// 	selection: '',
			// 	options_zh: [],
			// 	options_en: [],
			// 	options_value: []
			// },
			{
				name_zh: '工作日子（適用於兼職及臨時工作）',
				name_en: 'Work Days',
				field_type: 'multi_select',
				selection: [],
				importance: 1,
				options: [
					{
						id: 0,
						option_zh: '星期一',
						option_en: 'Monday',
						value: 'monday'
					},
					{
						id: 1,
						option_zh: '星期二',
						option_en: 'Tuesday',
						value: 'tuesday'
					},
					{
						id: 2,
						option_zh: '星期三',
						option_en: 'Wednesday',
						value: 'wednesday'
					},
					{
						id: 3,
						option_zh: '星期四',
						option_en: 'Thursday',
						value: 'thursday'
					},
					{
						id: 4,
						option_zh: '星期五',
						option_en: 'Friday',
						value: 'friday'
					},
					{
						id: 5,
						option_zh: '星期六',
						option_en: 'Saturday',
						value: 'saturday'
					},
					{
						id: 6,
						option_zh: '星期日',
						option_en: 'Sunday',
						value: 'sunday'
					},
				]
			},
			{
				name_zh: '最低月薪薪酬',
				name_en: 'Minimum Monthly Salary',
				field_type: 'input',
				selection: '',
				importance: 1,
				options: []
			},
			{
				name_zh: '最低時薪薪酬',
				name_en: 'Minimum Hourly Salary',
				field_type: 'input',
				selection: '',
				importance: 1,
				options: []
			},
			// {
			// 	name_zh: '公司產業',
			// 	name_en: 'Industry',
			// 	field_type: 'multi_select',
			// 	selection: '',
				// importance: '',
			// 	options_zh: [],
			// 	options_en: []
			// },
			{
				name_zh: '公司規模',
				name_en: 'Company Scale',
				field_type: 'multi_select',
				selection: [],
				importance: 1,
				options: [
					{
						id: 0,
						option_zh: '20人以下',
						option_en: 'Below 20',
						value: 'under_20'
					},
					{
						id: 1,
						option_zh: '21-100人',
						option_en: '21-100',
						value: '21-100'
					},
					{
						id: 2,
						option_zh: '101-500人',
						option_en: '101-500',
						value: '101-500'
					},
					{
						id: 3,
						option_zh: '501-1000人',
						option_en: '501-1000',
						value: '501-1000'
					},
					{
						id: 4,
						option_zh: '1000人以上',
						option_en: 'Above 1000',
						value: 'above_1000'
					}
				]
			},
			{
				name_zh: '出糧方式',
				name_en: 'Payment Methods',
				field_type: 'multi_select',
				selection: [],
				importance: 1,
				options: [
					{
						id: 0,
						option_zh: '現金',
						option_en: 'Cash',
						value: 'cash'
					},
					{
						id: 1,
						option_zh: '過數',
						option_en: 'Bank Transfer',
						value: 'transfer'
					},
					{
						id: 2,
						option_zh: '支票',
						option_en: 'Cheque',
						value: 'cheque'
					}
				]
			}
			// {
			// 	name_zh: '僱員福利（適用於全職工作）',
			// 	name_en: 'Benefits',
			// 	field_type: 'multi_select',
			// 	selection: '',
			// 	options_zh: [],
			// 	options_en: [],
			// 	options_value: []
			// },
		];
	}

	toggleEditMode() {
		this.edit_mode = !this.edit_mode;

		if (!this.edit_mode) {
			console.log('preference', this.preference_fields);
			this.saved_preferences = this.preference_fields;
			this.utils.setLocal('USER_PREFERENCE', this.preference_fields);
		} else {
			this.preference_fields = this.saved_preferences;
		}
	}

	checkUserPreference() {
		this.utils.getLocal('USER_PREFERENCE').then(pref => {
			if (!pref) {
				this.show_msg = true;
				this.preference_fields.forEach(preference => {
					// Default set all preferences importance to 'None'
					preference.importance = 0;
				});
				console.log('preference_fields', this.preference_fields);
			} else {
				this.show_msg = false;
				this.saved_preferences = pref;
				console.log('saved_preferences', this.saved_preferences);
			}
		})
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = '';
	}

	setPreference(preference, option) {
		console.log('option', option);
		console.log('preference', preference);
		option.selected = !option.selected;

		if (_.includes(preference.selection, option.id)) {
			// Remove option if it exits in preferences
			_.pull(preference.selection, option.id);
		} else {
			// Add option if it does not exist in preferences
			preference.selection.push(option.id);
		}
	}

	togglePreferenceWrapper(preference) {
		preference.isExpanded = !preference.isExpanded;
	}
}