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
    
    let applicant_id = this.params.get('applicant_id');
    this.api.startQueue([
			this.api.getApplicantProfile(applicant_id),
		]).then(response => {
      this.candidate = response[0];

      // Translate gender field
      switch(this.candidate.gender) {
        case 'female':
          this.candidate.gender_zh = '女';
          this.candidate.gender_en = 'Female';
          break;
        case 'male':
          this.candidate.gender_zh = '男';
          this.candidate.gender_en = 'Male';
          break;
      }

      // Translate age field
      this.candidate.age = moment().diff(moment(this.candidate.dob, "YYYY-MM-DD"), 'years');

      switch(this.candidate.education_level) {
        case 'never':
          this.candidate.education_zh = '從未';
          this.candidate.education_en = 'Never';
          break;
        case 'primary':
          this.candidate.education_zh = '小學或以下';
          this.candidate.education_en = 'Primary school or below';
          break;
        case 'secondary':
          this.candidate.education_zh = '中學';
          this.candidate.education_en = 'Secondary school';
          break;
        case 'post_secondary':
          this.candidate.education_zh = '大專 / 副學士 / 文憑';
          this.candidate.education_en = 'Post-secondary school / Associate Degree / Diploma';
          break;
        case 'university':
          this.candidate.education_zh = '大學或以上';
          this.candidate.education_en = 'University or above';
          break;
      }

      switch(this.candidate.employment_status) {
        case 'full_time':
          this.candidate.employment_zh = '全職';
          this.candidate.employment_en = 'Full Time';
          break;
        case 'part_time':
          this.candidate.employment_zh = '兼職';
          this.candidate.employment_en = 'Part Time';
          break;
        case 'self_employed':
          this.candidate.employment_zh = '自僱';
          this.candidate.employment_en = 'Self Employed';
          break;
        case 'home_maker':
          this.candidate.employment_zh = '主婦';
          this.candidate.employment_en = 'Home maker';
          break;
        case 'unemployed':
          this.candidate.employment_zh = '待業';
          this.candidate.employment_en = 'Unemployed';
          break;
        case 'student':
          this.candidate.employment_zh = '學生';
          this.candidate.employment_en = 'Student';
          break;
      }


      switch(this.candidate.related_experience) {
        case 'none':
          this.candidate.experience_zh = '沒有經驗';
          this.candidate.experience_en = 'None';
          break;
        case 'half_year':
          this.candidate.experience_zh = '半年或以內';
          this.candidate.experience_en = '6 months or less';
          break;
        case '1_year':
          this.candidate.experience_zh = '半年至1年';
          this.candidate.experience_en = '6 months to 1 year';
          break;
        case '3_year':
          this.candidate.experience_zh = '1年至3年';
          this.candidate.experience_en = '1 year to 3 years';
          break;
        case '3_year_above':
          this.candidate.experience_zh = '3年以上';
          this.candidate.experience_en = '3 years of more';
          break;
      }
      console.log(123, this.candidate);
    });
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = '';
	}
}