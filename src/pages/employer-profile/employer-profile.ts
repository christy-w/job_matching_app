import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';

@IonicPage()
@Component({
	selector: 'page-employer-profile',
	templateUrl: 'employer-profile.html'
})
export class EmployerProfilePage extends BasePage {

	name: string = 'EmployerProfilePage';
	profile_fields: any = [];

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('EmployerProfilePage constructor');

		this.profile_fields = [
			{
				name_zh: "個人資料",
				name_en: "Personal Details",
				type: "personal_details",
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
				name_en: "Work Experiences",
				type: "work_experiences",
				fields: [
					{
						name: "教育程度",
						required: true,
						field_type: "select", // input/select/multi_select/date/
						selection: '',
						options: ['小學或以下', '中學或以下', '副學士或高級文憑', '大學或以上']
					},
					{
						name: "職業狀況",
						required: true,
						field_type: "select", // input/select/multi_select/date/
						selection: '',
						options: ['全職', '兼職', '自僱', '待業', '主婦', '學生']
					},
					{
						name: "相關工作經驗",
						required: true,
						field_type: "select", // input/select/multi_select/date/
						selection: '',
						options: ['沒有經驗', '半年或以內', '半年至1年', '1年至3年', '3年以上']
					},
				]
			},
			{
				name_zh: "技能及資格",
				name_en: "Skills and Certificates",
				type: "skills_certificates",
				fields: [
					{
						name: "語言能力",
						required: false,
						field_type: "multi_select", // input/select/multi_select/date/
						selection: '',
						options: ['廣東話', '普通普通話', '流利普通話', '普通英語', '流利英語']
					},
					{
						name: "電腦技能",
						required: false,
						field_type: "multi_select", // input/select/multi_select/date/
						selection: '',
						options: ['Microsoft Word', 'Microsoft Excel', 'Microsoft Powerpoint', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe Indesign', 'AutoCAD']
					},
					{
						name: "保安資格",
						required: false,
						field_type: "multi_select", // input/select/multi_select/date/
						selection: '',
						options: ['QAS 優質保安證書', '保安人員許可證(A)', '保安人員許可證(B)', '保安人員許可證(C)', '保安人員許可證(D)']
					},
					{
						name: "受培訓經驗",
						required: false,
						field_type: "multi_select", // input/select/multi_select/date/
						selection: '',
						options: ['香港僱員培訓局', '香港人才培訓中心', '勞工署培訓課程']
					},
				]
			},
			{
				name_zh: "證明文件",
				name_en: "Identification Documents",

			}
		];
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = 'profile';
	}

	openProfileDetailPage(detail) {
		let params = { content: detail };
		this.nav.push('ApplicantProfileDetailPage', params);
	}

	openApplicantPreferencePage() {
		this.nav.push('ApplicantPreferencePage');
	}

	openApplicantRecordPage() {
		this.nav.push('ApplicantRecordPage');
	}

	openApplicantReviewPage() {
		this.nav.push('ApplicantReviewPage');
	}
}