import { Component } from '@angular/core';
import { Platform, ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';
import _ from 'lodash';
import { FeedbackPopup } from '../../components/feedback-popup/feedback-popup';

@IonicPage()
@Component({
	selector: 'page-employer-record',
	templateUrl: 'employer-record.html'
})
export class EmployerRecordPage extends BasePage {

	name: string = 'EmployerRecordPage';
	records: any;
	job: any;

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api,
		private params: NavParams
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('EmployerRecordPage constructor');
		
		let job_id = this.params.get('job_id');
		this.api.startQueue([
			this.api.getJobDetail(job_id),
			this.api.getJobApplications(job_id)
		]).then(response => {
			this.job = response[0];

			// Format job type and wage
			let monthly_wage = this.job.monthly_wage;
			let hourly_wage = this.job.hourly_wage;
			switch(this.job.type) {
				case 'fulltime':
					this.job.type_zh = '全職';
					this.job.type_en = 'Full Time';
					this.job.wage_zh = '$' + monthly_wage + '/月';
					this.job.wage_en = '$' + monthly_wage + '/Month';
					break;
				case 'parttime':
					this.job.type_zh = '兼職';
					this.job.type_en = 'Part Time';
					this.job.wage_zh = '$' + hourly_wage + '/小時';
					this.job.wage_en = '$' + hourly_wage + '/Hour';
					break;
				case 'temporary':
					this.job.type_zh = '臨時工作';
					this.job.type_en = 'Temporary Work';
					this.job.wage_zh = '$' + hourly_wage + '/小時';
					this.job.wage_en = '$' + hourly_wage + '/Hour';
					break;
			}
			console.log('job', this.job);

      		let records = _.filter(response[1], function(o) {
				return o.application_status != 'submitted';
			});

			_.each(records, (record) => {
				switch (record.application_status) {
					case 'offered': 
						record.status_zh = '等待回覆';
						record.status_en = 'Offered';
						record.status_color = '#fab712'; // green
						record.allow_operation = 'cancel'; // cancel
						break;
					case 'accepted_offer': 
						record.status_zh = '己接受工作';
						record.status_en = 'Offer accepted';
						record.status_color = '#4ebc4e'; // green
						record.allow_operation = 'feedback'; // none
						// none
						break;
					case 'withdrawn': 
						record.status_zh = '已拒絕';
						record.status_en = 'Rejected';
						record.status_color = '#f05050'; // red
						record.allow_operation = 'none'; // none
						// none
						break;
					case 'vacancy_filled': 
						record.status_zh = '已拒絕';
						record.status_en = 'Rejected';
						record.status_color = '#f05050'; // red
						record.allow_operation = 'none'; // none
						// none
						break;
					case 'rejected_offer': 
						record.status_zh = '申請者已拒絕';
						record.status_en = 'Offer rejected';
						record.status_color = '#f05050'; // red
						record.allow_operation = 'none'; // none
						// none
						break;
					case 'cancelled': 
						record.status_zh = '已取消申請';
						record.status_en = 'Cancelled';
						record.status_color = '#f05050'; // red
						record.allow_operation = 'none'; // none
						// none
						break;
				}
			})
			this.records = _.orderBy(records, ['last_updated_at'], ['desc']);
			console.log('records', this.records);
		});
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = 'record';
	}

	cancelApplication(application_id) {
		this.utils.showConfirm('', this.utils.instantLang('MSG.CANCEL_CONFIRM'), ()=>{
			this.api.startQueue([
				this.api.postApplicationCancel(application_id)
			]).then(response => {
				let cancel_response = response[0];
				if (cancel_response['status']) {
					// Applied successful
					this.utils.showAlert('', this.utils.instantLang('MSG.CANCEL_SUCCESS'));
				} else {
					// Apply failed
					this.utils.showAlert('', this.utils.instantLang('MSG.CANCEL_FAILED'));
				}
				this.nav.setRoot('ApplicantRecordPage');
			})
		});
	}

	cancelOffer(application_id) {
		this.utils.showConfirm('', this.utils.instantLang('MSG.CANCEL_OFFER_CONFIRM'), () => {
			let data = {
				application_status: 'vacancy_filled'
			}
			this.api.startQueue([
				this.api.postApplicationUpdate(application_id, data)
			]).then(response => {
				let accept_response = response[0];
				if (accept_response['status']) {
					// Applied successful
					this.utils.showAlert('', this.utils.instantLang('MSG.CANCEL_OFFER_SUCCESS'));
				} else {
					// Apply failed
					this.utils.showAlert('', this.utils.instantLang('MSG.CANCEL_OFFER_FAILED'));
				}
				this.nav.setRoot('EmployerRecordPage');
			})
		});
	}

	seeJobDetail(job_id) {
		let data = { 'job_id': job_id };
		this.nav.push('ApplicantJobPage', data);
	}

	leaveFeedback(job_id, applicant_id) {
		let feedback_popup = this.utils.createPopover(FeedbackPopup, {'job_id': job_id, 'applicant_id': applicant_id}, {cssClass:'feedback-popup'});
		feedback_popup.onDidDismiss(data => {
			// (data) ? this.saveFilter(data) : this.cancelFilter();
			// this.filterShown = false;
		});
		feedback_popup.present();
	}
}