import { Component } from '@angular/core';
import { Platform, ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import _ from 'lodash';

@IonicPage()
@Component({
	selector: 'page-employer-preference',
	templateUrl: 'employer-preference.html'
})
export class EmployerPreferencePage extends BasePage {

	name: string = 'EmployerPreferencePage';
	preference_fields: any = [];
	preference_options: any = {};
	edit_mode: boolean = false;
	show_msg: boolean = false;
	language: string = '';

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private params: NavParams
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('EmployerPreferencePage constructor');
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = 'profile';
		this.language = this.utils.currentLang();
		this.initPreferenceArrays();
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
				name_zh: '性別',
				name_en: 'Gender',
				value: 'gender',
				field_type: 'multi_select',
				selection: [],
				importance: 1,
				options: [
					{
						id: 0,
						option_zh: '男',
						option_en: 'Male',
						value: 'male'
					},
					{
						id: 1,
						option_zh: '女',
						option_en: 'Female',
						value: 'female'
					}
				]
			},
			{
				name_zh: '教育程度',
				name_en: 'Education Level',
				value: 'education_level',
				field_type: 'multi_select',
				selection: [],
				importance: 1,
				options: [
					{
						id: 0,
						option_zh: '從未',
						option_en: 'Never',
						value: 'never'
					},
					{
						id: 1,
						option_zh: '小學或以下',
						option_en: 'Primary school or below',
						value: 'primary'
					},
					{
						id: 2,
						option_zh: '中學',
						option_en: 'Secondary school',
						value: 'secondary'
					},
					{
						id: 3,
						option_zh: '大專 / 副學士 / 文憑',
						option_en: 'Post-secondary school / Associate Degree / Diploma',
						value: 'post_secondary'
					},
					{
						id: 4,
						option_zh: '大學或以上',
						option_en: 'University or above',					
						value: 'university'
					}
				]
			},
			{
				name_zh: '相關工作經驗',
				name_en: 'Related Experiences',
				value: 'related_experience',
				field_type: 'multi_select',
				selection: [],
				importance: 1,
				options: [
					{
						id: 0,
						option_zh: '沒有經驗',
						option_en: 'None',
						value: 'none'
					},
					{
						id: 1,
						option_zh: '半年或以內',
						option_en: '6 months or less',
						value: 'half_year'
					},
					{
						id: 2,
						option_zh: '半年至1年',
						option_en: '6 months to 1 year',
						value: '1_year'
					},
					{
						id: 3,
						option_zh: '1年至3年',
						option_en: '1 year to 3 years',
						value: '3_year'
					},
					{
						id: 4,
						option_zh: '3年以上',
						option_en: '3 years or more',
						value: '3_year_above'
					}
				]
			}
		];
	}

	toggleEditMode() {
		this.edit_mode = !this.edit_mode;
		this.show_msg = false;

		console.log('edit_mode',this.edit_mode);
		if (!this.edit_mode) {
			// Save Preference
			console.log('preference', this.preference_fields);
			this.utils.setLocal('USER_PREFERENCE', this.preference_fields);
		} else {
			console.log('editing for following preferences', this.preference_fields);
		}
	}

	checkUserPreference() {
		this.utils.getLocal('USER_PREFERENCE').then(pref => {
			if (!pref || pref == null) {
				this.show_msg = true;
				this.preference_fields.forEach(preference => {
					// Default set all preferences importance to 'None'
					preference.importance = 0;
				});
				console.log('preference_fields', this.preference_fields);
			} else {
				this.show_msg = false;
				// Check if pref are null
				_.each(pref, (preference) => {
					if (preference.selection == '' || preference.selection.length == 0) {
						console.log('preference ' + preference.value + ' is empty');
						preference.importance = 0;
					}
				})
				this.preference_fields = pref;
				console.log('saved_preferences', this.preference_fields);
			}
		})
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

	backToProfile() {
		if (this.edit_mode) {
			this.utils.showConfirm('', this.utils.instantLang('MSG.PREFERENCE_INTERRUPT'), () => {
				this.edit_mode = false;
				this.nav.pop();
			})
		} else {
			this.nav.pop();
		}
	}
}