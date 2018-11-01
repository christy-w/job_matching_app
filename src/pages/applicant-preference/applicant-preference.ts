import { Component } from '@angular/core';
import { Platform, ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';

@IonicPage()
@Component({
	selector: 'page-applicant-preference',
	templateUrl: 'applicant-preference.html'
})
export class ApplicantPreferencePage extends BasePage {

	name: string = 'ApplicantPreferencePage';
	setting_fields: any = [];
	preference_fields: any = [];

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private params: NavParams
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('ApplicantPreferencePage constructor');
		
		this.setting_fields = [
			{
				name: '可工作類別',
				field_type: 'multi_select', // input/select/multi_select/date/
				selection: '',
				options: ['全職', '兼職', '臨時工作']
			},
			{
				name: '可工作地區',
				field_type: 'multi_select', // input/select/multi_select/date/
				selection: '',
				options: ['油尖旺區', '深水埗區', '九龍城區']
			},
			{
				name: '可工作時段（適用於兼職及臨時工作）',
				field_type: 'multi_select', // input/select/multi_select/date/
				selection: '',
				options: ['早上', '下午', '晚間' ,'凌晨']
			},
			{
				name: '可工作日子（適用於兼職及臨時工作）',
				field_type: 'multi_select', // input/select/multi_select/date/
				selection: '',
				options: ['星期一', '星期二', '星期三' ,'星期四', '星期五', '星期六' ,'星期日']
			},
			{
				name: '可上班日期',
				field_type: 'date', // input/select/multi_select/date/
				selection: '',
				options: []
			},
		];

		this.preference_fields = [
			{
				name: '理想時酬（適用於兼職及臨時工作）',
				field_type: 'input', // input/select/multi_select/date/range
				selection: '',
				options: []
			},
			{
				name: '理想月薪（適用於全職工作）',
				field_type: 'input', // input/select/multi_select/date/range
				selection: '',
				options: []
			},
			{
				name: '公司產業',
				field_type: 'multi_select', // input/select/multi_select/date/range
				selection: '',
				options: ['餐飲業', '酒店業', '展覽業', '運輸業', '零售業']
			},
			{
				name: '公司規模',
				field_type: 'multi_select', // input/select/multi_select/date/range
				selection: '',
				options: ['1-25人', '25-100人', '100-1000人', '1000人以上']
			},
			{
				name: '出糧方式',
				field_type: 'multi_select', // input/select/multi_select/date/range
				selection: '',
				options: ['過數出糧', '現金出糧', '支票出糧']
			},
		];
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = '';
	}
}