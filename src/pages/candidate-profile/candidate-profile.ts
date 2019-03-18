import { Component } from '@angular/core';
import { Platform, ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';
import * as moment from 'moment';

@IonicPage()
@Component({
	selector: 'page-candidate-profile',
	templateUrl: 'candidate-profile.html'
})
export class CandidateProfilePage extends BasePage {

	name: string = 'CandidateProfilePage';
  candidate: any;

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
    protected utils: Utils,
    private api: Api,
    private params: NavParams
	) {
		super(platform, view, nav, utils);
    Config.DEBUG_VERBOSE && console.log('CandidateProfilePage constructor');
    // let applicant_id = '3';
    let applicant_id = this.params.get('applicant_id');
    this.api.startQueue([
			this.api.getApplicantProfile(applicant_id),
		]).then(response => {
      let candidate = response[0];
      // Translate gender field
      switch(candidate.gender) {
        case 'female':
          candidate.gender_zh = '女';
          candidate.gender_en = 'Female';
          break;
        case 'male':
          candidate.gender_zh = '男';
          candidate.gender_en = 'Male';
          break;
      }

      // Translate age field
      candidate.age = moment().diff(moment(candidate.dob, "YYYY-MM-DD"), 'years');

      switch(candidate.education_level) {
        case 'never':
          candidate.education_zh = '從未';
          candidate.education_en = 'Never';
          break;
        case 'primary':
          candidate.education_zh = '小學或以下';
          candidate.education_en = 'Primary school or below';
          break;
        case 'secondary':
          candidate.education_zh = '中學';
          candidate.education_en = 'Secondary school';
          break;
        case 'post_secondary':
          candidate.education_zh = '大專 / 副學士 / 文憑';
          candidate.education_en = 'Post-secondary school / Associate Degree / Diploma';
          break;
        case 'university':
          candidate.education_zh = '大學或以上';
          candidate.education_en = 'University or above';
          break;
      }

      switch(candidate.employment_status) {
        case 'full_time':
          candidate.employment_zh = '全職';
          candidate.employment_en = 'Full Time';
          break;
        case 'part_time':
          candidate.employment_zh = '兼職';
          candidate.employment_en = 'Part Time';
          break;
        case 'self_employed':
          candidate.employment_zh = '自僱';
          candidate.employment_en = 'Self Employed';
          break;
        case 'home_maker':
          candidate.employment_zh = '主婦';
          candidate.employment_en = 'Home maker';
          break;
        case 'unemployed':
          candidate.employment_zh = '待業';
          candidate.employment_en = 'Unemployed';
          break;
        case 'student':
          candidate.employment_zh = '學生';
          candidate.employment_en = 'Student';
          break;
      }

      switch(candidate.related_experience) {
        case 'none':
          candidate.experience_zh = '沒有經驗';
          candidate.experience_en = 'None';
          break;
        case 'half_year':
          candidate.experience_zh = '半年或以內';
          candidate.experience_en = '6 months or less';
          break;
        case '1_year':
          candidate.experience_zh = '半年至1年';
          candidate.experience_en = '6 months to 1 year';
          break;
        case '3_year':
          candidate.experience_zh = '1年至3年';
          candidate.experience_en = '1 year to 3 years';
          break;
        case '3_year_above':
          candidate.experience_zh = '3年以上';
          candidate.experience_en = '3 years of more';
          break;
      }

      candidate.language_texts = [];
      candidate.language_abilities.forEach(lang_id => {
        this.api.getSystemInfoItem('language_ability', lang_id).then(lang => {
          candidate.language_texts.push(lang);
        })
      });

      candidate.computer_texts = [];
      candidate.computer_skills.forEach(skill_id => {
        this.api.getSystemInfoItem('computer_skill', skill_id).then(skill => {
          candidate.computer_texts.push(skill);
        })
      });

      candidate.related_texts = [];
      candidate.related_certs.forEach(cert_id => {
        this.api.getSystemInfoItem('related_certificate', cert_id).then(cert => {
          candidate.related_texts.push(cert);
        })
      });
      
      this.candidate = candidate;
      console.log(123, this.candidate);
    });
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = '';
	}
}