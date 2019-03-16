import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';
import _ from 'lodash';

@IonicPage()
@Component({
	selector: 'page-employer-job-create',
	templateUrl: 'employer-job-create.html'
})
export class EmployerJobCreatePage extends BasePage {

	name: string = 'EmployerJobCreatePage';
	job_fields: any;
	districts: any;
	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('EmployerJobCreatePage constructor');

		this.api.startQueue([
			this.api.getSystemInfo('districts')
		]).then(response => {
			this.districts = response[0];
		});

		this.job_fields = [
			{	
				name_zh: '職位名稱（中）',
				name_en: 'Position Title (Chinese)',
				value: 'name_zh',
				required: true,
				type: 'input',
				input: '',
				options: []
			},
			{	
				name_zh: '職位名稱（英）',
				name_en: 'Position Title (English)',
				value: 'name_en',
				required: true,
				type: 'input',
				input: '',
				options: []
			},
			{	
				name_zh: '工作類別',
				name_en: 'Employment Type',
				value: 'type',
				required: true,
				type: 'select',
				input: '',
				options: [
					{
						name_zh: '全職',
						name_en: 'Full Time',
						value: 'fulltime'
					},
					{
						name_zh: '兼職',
						name_en: 'Part Time',
						value: 'parttime'
					},
					{
						name_zh: '臨時工作',
						name_en: 'Temporary Work',
						value: 'temporary'
					}
				]
			},
			{	
				name_zh: '工作地區',
				name_en: 'Working District',
				value: 'district_id',
				required: true,
				type: 'district_select',
				input: '',
				options: []
			},
			{	
				name_zh: '工作地址（中）',
				name_en: 'Working Location (Chinese)',
				value: 'location_zh',
				required: false,
				type: 'input',
				input: '',
				options: []
			},
			{	
				name_zh: '工作地址（英）',
				name_en: 'Working Location (English)',
				value: 'location_en',
				required: false,
				type: 'input',
				input: '',
				options: []
			},
			{	
				name_zh: '月薪起點',
				name_en: 'Minimum Monthly Wage',
				value: 'monthly_wage',
				required: false,
				type: 'input',
				input: '',
				options: []
			},
			{	
				name_zh: '時薪起點',
				name_en: 'Minimum Hourly Wage',
				value: 'hourly_wage',
				required: false,
				type: 'input',
				input: '',
				options: []
			},
			{	
				name_zh: '職責（中）',
				name_en: 'Job Description (Chinese)',
				value: 'description_zh',
				required: true,
				type: 'textarea',
				input: '',
				options: []
			},
			{	
				name_zh: '職責（英文）',
				name_en: 'Job Description (English)',
				value: 'description_zh',
				required: true,
				type: 'textarea',
				input: '',
				options: []
			},
			{	
				name_zh: '要求（中）',
				name_en: 'Requirements (Chinese)',
				value: 'requirements_zh',
				required: false,
				type: 'textarea',
				input: '',
				options: []
			},
			{	
				name_zh: '要求（英）',
				name_en: 'Requirements (English)',
				value: 'requirements_en',
				required: false,
				type: 'textarea',
				input: '',
				options: []
			},
			{	
				name_zh: '福利（中）',
				name_en: 'Benefits (Chinese)',
				value: 'benefits_zh',
				required: false,
				type: 'textarea',
				input: '',
				options: []
			},
			{	
				name_zh: '福利（英）',
				name_en: 'Benefits (English)',
				value: 'benefits_en',
				required: false,
				type: 'textarea',
				input: '',
				options: []
			},
			{	
				name_zh: '其他資訊（中）',
				name_en: 'Additional Information (Chinese)',
				value: 'others_zh',
				required: false,
				type: 'textarea',
				input: '',
				options: []
			},
			{	
				name_zh: '其他資訊（英）',
				name_en: 'Additional Information (English)',
				value: 'others_en',
				required: false,
				type: 'textarea',
				input: '',
				options: []
			},
			{	
				name_zh: '出糧方式',
				name_en: 'Payment Method',
				value: 'payment_method',
				required: true,
				type: 'select',
				input: '',
				options: [
					{
						name_zh: '現金',
						name_en: 'Cash',
						value: 'cash'
					},
					{
						name_zh: '過數',
						name_en: 'Bank Transfer',
						value: 'transfer'
					},
					{
						name_zh: '支票',
						name_en: 'Cheque',
						value: 'cheque'
					}
				]
			}
		];
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = '';
	}

	completeForm() {
		console.log('form', this.job_fields);

		// Check for insufficient info
		for(let i=0; i<this.job_fields.length; i++) {
			let field = this.job_fields[i];
			if (field.required) {
				if (field.input == '' || field.input.length == 0) {
					console.log('not enough info');
					this.utils.showAlert('', this.utils.instantLang('MSG.CREATE_NOT_ENOUGH'));
					return;
				}
			}
		}

		// Sufficient Info, pass to create
		let create_data = {};
		_.each(this.job_fields, (field) => {
			create_data[field.value] = field.input;
		})
		console.log('create_data', create_data);

		this.api.startQueue([
			this.api.postJobCreate(create_data)
		]).then(response => {
			let create_response = response[0];

			if (create_response && create_response.status) {
				this.utils.showAlert('', this.utils.instantLang('MSG.CREATE_SUCCESS'));
				this.nav.setRoot('EmployerHomePage');
			} else {
				this.utils.showAlert('', this.utils.instantLang('MSG.CREATE_FAILED'));
			}

		});
	}
}