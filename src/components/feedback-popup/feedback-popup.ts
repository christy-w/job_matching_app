import { Component } from '@angular/core';
import { NavParams, NavController, ViewController } from 'ionic-angular';
import { Api } from '../../providers';
import { Utils } from '../../core/providers/utils';
@Component({
  selector: 'feedback-popup',
  templateUrl: 'feedback-popup.html'
})
export class FeedbackPopup {

  job_id: string;
  applicant_id: string;
  username: string = '';
  feedback: string = '';
  rating: any;

  constructor(
    private params: NavParams, 
    private nav: NavController, 
    private view: ViewController,
    private api: Api,
    private utils: Utils
  ) {
    this.job_id = this.params.get('job_id');
    this.applicant_id = this.params.get('applicant_id');
  }

  seeAllCandidate() {
    let data = { 'job_id': this.job_id};
    this.nav.push('EmployerApplicantPage', data);
    this.view.dismiss();
  }

  seeRecommendCandidate() {
    let data = { 'job_id': this.job_id};
    this.nav.push('EmployerRecommendationPage', data);
    this.view.dismiss();
  }

  submitFeedback() {
    let data = {
      'job_id': this.job_id,
      'applicant_user_id': this.applicant_id,
      'username': this.username,
      'feedback': this.feedback,
      'rating': this.rating
    };

    console.log('submit data', data);
    this.api.startQueue([
      this.api.postApplicantFeedback(data)
    ]).then(response => {
      response = response[0];

      if (response && response['status']) {
        this.utils.showToast(this.utils.instantLang('MSG.SUCCESS'));
        this.view.dismiss();
      } else {
        this.utils.showToast(this.utils.instantLang('MSG.ERROR'));
      }
    })
  }
}
