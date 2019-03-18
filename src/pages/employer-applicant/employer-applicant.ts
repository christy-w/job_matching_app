import { Component, ViewChild } from '@angular/core';
import { Platform, ViewController, NavController, Slides, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';
import { Match } from '../../providers';
import * as moment from 'moment';

import _ from 'lodash';
@IonicPage()
@Component({
	selector: 'page-employer-applicant',
	templateUrl: 'employer-applicant.html'
})
export class EmployerApplicantPage extends BasePage {
	@ViewChild('cardSlider') slides: Slides;

	name: string = 'EmployerApplicantPage';
	user_preference: any;
	applications: any;

	recommendations: any = [];
	

	must_applicants: any = [];
	preferred_applicants: any = [];
	other_jobs: any = [];
	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api,
		private match: Match,
		private params: NavParams
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('EmployerApplicantPage constructor');
		
    let job_id = this.params.get('job_id');
    // let job_id = '3';
		this.initApplications(job_id);
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = '';
	}
	
	initApplications(job_id) {
		this.api.startQueue([
			this.api.getJobApplications(job_id)
		]).then(response => {
      this.applications = _.filter(response[0], {'application_status': 'submitted'});

      for (let i=0; i<this.applications.length; i++) {
         // Translate gender field
         switch(this.applications[i].applicant.gender) {
          case 'female':
            this.applications[i].applicant.gender_zh = '女';
            this.applications[i].applicant.gender_en = 'Female';
            break;
          case 'male':
            this.applications[i].applicant.gender_zh = '男';
            this.applications[i].applicant.gender_en = 'Male';
            break;
        }

        // Translate age field
        this.applications[i].applicant.age = moment().diff(moment(this.applications[i].applicant.dob, "YYYY-MM-DD"), 'years');

        switch(this.applications[i].applicant.education_level) {
          case 'never':
            this.applications[i].applicant.education_zh = '從未';
            this.applications[i].applicant.education_en = 'Never';
            break;
          case 'primary':
            this.applications[i].applicant.education_zh = '小學或以下';
            this.applications[i].applicant.education_en = 'Primary school or below';
            break;
          case 'secondary':
            this.applications[i].applicant.education_zh = '中學';
            this.applications[i].applicant.education_en = 'Secondary school';
            break;
          case 'post_secondary':
            this.applications[i].applicant.education_zh = '大專 / 副學士 / 文憑';
            this.applications[i].applicant.education_en = 'Post-secondary school / Associate Degree / Diploma';
            break;
          case 'university':
            this.applications[i].applicant.education_zh = '大學或以上';
            this.applications[i].applicant.education_en = 'University or above';
            break;
        }

        switch(this.applications[i].applicant.employment_status) {
          case 'full_time':
            this.applications[i].applicant.employment_zh = '全職';
            this.applications[i].applicant.employment_en = 'Full Time';
            break;
          case 'part_time':
            this.applications[i].applicant.employment_zh = '兼職';
            this.applications[i].applicant.employment_en = 'Part Time';
            break;
          case 'self_employed':
            this.applications[i].applicant.employment_zh = '自僱';
            this.applications[i].applicant.employment_en = 'Self Employed';
            break;
          case 'home_maker':
            this.applications[i].applicant.employment_zh = '主婦';
            this.applications[i].applicant.employment_en = 'Home maker';
            break;
          case 'unemployed':
            this.applications[i].applicant.employment_zh = '待業';
            this.applications[i].applicant.employment_en = 'Unemployed';
            break;
          case 'student':
            this.applications[i].applicant.employment_zh = '學生';
            this.applications[i].applicant.employment_en = 'Student';
            break;
        }

        switch(this.applications[i].applicant.related_experience) {
          case 'none':
            this.applications[i].applicant.experience_zh = '沒有經驗';
            this.applications[i].applicant.experience_en = 'None';
            break;
          case 'half_year':
            this.applications[i].applicant.experience_zh = '半年或以內';
            this.applications[i].applicant.experience_en = '6 months or less';
            break;
          case '1_year':
            this.applications[i].applicant.experience_zh = '半年至1年';
            this.applications[i].applicant.experience_en = '6 months to 1 year';
            break;
          case '3_year':
            this.applications[i].applicant.experience_zh = '1年至3年';
            this.applications[i].applicant.experience_en = '1 year to 3 years';
            break;
          case '3_year_above':
            this.applications[i].applicant.experience_zh = '3年以上';
            this.applications[i].applicant.experience_en = '3 years of more';
            break;
        }

        if (this.applications[i].applicant.language_abilities) {
          this.applications[i].applicant.language_texts = [];
          this.applications[i].applicant.language_abilities.forEach(lang_id => {
            this.api.getSystemInfoItem('language_ability', lang_id).then(lang => {
              this.applications[i].applicant.language_texts.push(lang);
            })
          });
        }

        if (this.applications[i].applicant.computer_skills) {
          this.applications[i].applicant.computer_texts = [];
          this.applications[i].applicant.computer_skills.forEach(skill_id => {
            this.api.getSystemInfoItem('computer_skill', skill_id).then(skill => {
              this.applications[i].applicant.computer_texts.push(skill);
            })
          });
        }

        if (this.applications[i].applicant.related_certs) {
          this.applications[i].applicant.related_texts = [];
          this.applications[i].applicant.related_certs.forEach(cert_id => {
            this.api.getSystemInfoItem('related_certificate', cert_id).then(cert => {
              this.applications[i].applicant.related_texts.push(cert);
            })
          });
        }
        console.log('123', this.applications[i]);
      }
      console.log('applications', this.applications);
		});
	}

	seeDetail(applicant_id) {
		let data = { 'applicant_id': applicant_id };
		this.nav.push('CandidateProfilePage', data);
	}

	hireApplicant(application_id) {
		this.utils.showConfirm('', this.utils.instantLang('MSG.OFFER_CONFIRM'), ()=>{
			let data = {
				application_status: 'offered'
			}
			this.api.startQueue([
				this.api.postApplicationUpdate(application_id, data)
			]).then(response => {
				let accept_response = response[0];
				if (accept_response['status']) {
					// Applied successful
					this.utils.showAlert('', this.utils.instantLang('MSG.OFFER_SUCCESS'));
				} else {
					// Apply failed
					this.utils.showAlert('', this.utils.instantLang('MSG.OFFER_FAILED'));
				}
				this.nav.setRoot('EmployerRecordPage');
			})
		})
	}

	goSettingPage() {
		this.nav.setRoot('EmployerProfilePage');
	}
}