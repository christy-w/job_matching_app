import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';

@IonicPage()
@Component({
	selector: 'page-applicant-profile',
	templateUrl: 'applicant-profile.html'
})
export class ApplicantProfilePage extends BasePage {

	name: string = 'ApplicantProfilePage';
	profile_fields: any = [];

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('ApplicantProfilePage constructor');

		this.profile_fields = [
			{
				name_zh: "個人資料",
				name_en: "Personal Details",
				fields: [
					{
						name: "中文姓名",
						required: true,
						field_type: "input", // input/select/multi_select/date/
						selection: '',
						options: []
					},
					{
						name: "英文姓名",
						required: true,
						field_type: "input", // input/select/multi_select/date/
						selection: '',
						options: []
					},
					{
						name: "電郵",
						required: true,
						field_type: "input", // input/select/multi_select/date/
						selection: '',
						options: []
					},
					{
						name: "性別",
						required: true,
						field_type: "select", // input/select/multi_select/date/
						selection: '',
						options: ['男', '女']
					},
					{
						name: "出生日期",
						required: true,
						field_type: "date", // input/select/multi_select/date/
						selection: '',
						options: []
					},
					{
						name: "居住地區",
						required: true,
						field_type: "multi_select", // input/select/multi_select/date/
						selection: '',
						options: ['油尖旺區', '深水埗區', '九龍城區']
					},
					{
						name: "地址",
						required: true,
						field_type: "input", // input/select/multi_select/date/
						selection: '',
						options: []
					},
				]
			},
			{
				name_zh: "工作經驗",
				name_en: "Work Experiences"
			},
			{
				name_zh: "技能及資格",
				name_en: "Skills and Certificates"
			},
			{
				name_zh: "證明文件",
				name_en: "Identification Documents"
			},
			{
				name_zh: "要求及喜好",
				name_en: "Requirements and Preferences"
			},
		];
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = 'profile';
	}

	openProfileDetailPage(detail) {
		let params = { content: detail };
		this.nav.push('ApplicantProfileDetailPage', params);
	}
}