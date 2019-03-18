import { Component } from '@angular/core';
import { NavParams, NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'candidate-popup',
  templateUrl: 'candidate-popup.html'
})
export class CandidatePopup {

  job_id: string;

  constructor(private params: NavParams, private nav: NavController, private view: ViewController) {
    this.job_id = this.params.get('job_id')
    console.log('job_id', this.job_id);
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
}
