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
	}

	initPreferenceArrays() {
		this.preference_options = [
			{
				name_zh: '必要',
				name_en: 'Must',
				value: 'must'
			},
			{
				name_zh: '優先',
				name_en: 'Preferred',
				value: 'preferred'
			},
			{
				name_zh: '毋須',
				name_en: 'None',
				value: 'none'
			}
		];
		
		this.preference_fields = [
			{
				name_zh: '工作類別',
				name_en: 'Employment Type',
				field_type: 'multi_select',
				selection: [],
				importance: '',
				options: [
					{
						option_zh: '全職',
						option_en: 'Full time',
						value: 'fulltime'
					},
					{
						option_zh: '兼職',
						option_en: 'Part time',
						value: 'parttime'
					},
					{
						option_zh: '臨時工作',
						option_en: 'Temporary work',
						value: 'temporary'
					},
					{
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
				importance: '',
				options: [
					{
						option_zh: '星期一',
						option_en: 'Monday',
						value: 'monday'
					},
					{
						option_zh: '星期二',
						option_en: 'Tuesday',
						value: 'tuesday'
					},
					{
						option_zh: '星期三',
						option_en: 'Wednesday',
						value: 'wednesday'
					},
					{
						option_zh: '星期四',
						option_en: 'Thursday',
						value: 'thursday'
					},
					{
						option_zh: '星期五',
						option_en: 'Friday',
						value: 'friday'
					},
					{
						option_zh: '星期六',
						option_en: 'Saturday',
						value: 'saturday'
					},
					{
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
				selection: [],
				importance: '',
				options: []
			},
			{
				name_zh: '最低時薪薪酬',
				name_en: 'Minimum Hourly Salary',
				field_type: 'input',
				selection: [],
				importance: '',
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
				importance: '',
				options: [
					{
						option_zh: '20人以下',
						option_en: 'Below 20',
						value: 'under_20'
					},
					{
						option_zh: '21-100人',
						option_en: '21-100',
						value: '21-100'
					},
					{
						option_zh: '101-500人',
						option_en: '101-500',
						value: '101-500'
					},
					{
						option_zh: '501-1000人',
						option_en: '501-1000',
						value: '501-1000'
					},
					{
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
				importance: '',
				options: [
					{
						option_zh: '現金',
						option_en: 'Cash',
						value: 'cash'
					},
					{
						option_zh: '過數',
						option_en: 'Bank Transfer',
						value: 'transfer'
					},
					{
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

		this.preference_fields.forEach(preference => {
			preference.importance = 'preferred';
		});
		console.log('preference_fields', this.preference_fields);
	}

	toggleEditMode() {
		this.edit_mode = !this.edit_mode;

		if (!this.edit_mode) {
			console.log('preference', this.preference_fields);
		}
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = '';
	}

	setPreference(preference, option) {
		console.log('option', option);
		console.log('preference', preference);
		option.selected = !option.selected;

		// if (option.selected) {

		// 	console.log(option.value + ' is selected');
		// } else {
		// 	console.log(option.value + ' is removed');
		// }
		if (_.includes(preference.selection, option.value)) {
			// Remove spot if it exits in favourites
			_.pull(preference.selection, option.value);
		} else {
			// Add spot if it does not exist in favourites
			preference.selection.push(option.value);
		}
	}

	togglePreferenceWrapper(preference) {
		preference.isExpanded = !preference.isExpanded;
	}
}