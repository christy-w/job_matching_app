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
	selector: 'page-applicant-record',
	templateUrl: 'applicant-record.html'
})
export class ApplicantRecordPage extends BasePage {

	name: string = 'ApplicantRecordPage';
	records: any;

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('ApplicantRecordPage constructor');
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = 'record';

		this.api.startQueue([
			this.api.getApplicationsByUser()
		]).then(response => {
			let records = response[0];

			_.each(records, (record) => {
				switch (record.application_status) {
					case 'submitted': 
						record.status_zh = '已遞交申請';
						record.status_en = 'Submitted';
						record.status_color = '#fab712'; // yellow
						record.allow_operation = 'cancel'; // cancel
						break;
					case 'in_progress':
						record.status_zh = '申請處理中';
						record.status_en = 'In progress';
						record.status_color = '#fab712'; // yellow
						record.allow_operation = 'cancel'; // cancel
						break;
					case 'offered': 
						record.status_zh = '申請成功';
						record.status_en = 'Offered';
						record.status_color = '#4ebc4e'; // green
						record.allow_operation = 'offer'; // cancel
						break;
					case 'accepted_offer': 
						record.status_zh = '己接受工作';
						record.status_en = 'Offer accepted';
						record.status_color = '#4ebc4e'; // green
						record.allow_operation = 'none'; // none
						// none
						break;
					case 'withdrawn': 
						record.status_zh = '職位已取消';
						record.status_en = 'Position withdrawn';
						record.status_color = '#f05050'; // red
						record.allow_operation = 'none'; // none
						// none
						break;
					case 'vacancy_filled': 
						record.status_zh = '職位已滿';
						record.status_en = 'Vacancy filled';
						record.status_color = '#f05050'; // red
						record.allow_operation = 'none'; // none
						// none
						break;
					case 'rejected_offer': 
						record.status_zh = '已拒絕工作';
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

				// Format publish dates
				let job = record.job;

				// Format job type and wage
				let monthly_wage = job.monthly_wage;
				let hourly_wage = job.hourly_wage;
				switch(job.type) {
					case 'fulltime':
						job.type_zh = '全職';
						job.type_en = 'Full Time';
						job.wage_zh = '$' + monthly_wage + '/月';
						job.wage_en = '$' + monthly_wage + '/Month';
						break;
					case 'parttime':
						job.type_zh = '兼職';
						job.type_en = 'Part Time';
						job.wage_zh = '$' + hourly_wage + '/小時';
						job.wage_en = '$' + hourly_wage + '/Hour';
						break;
					case 'temporary':
						job.type_zh = '臨時工作';
						job.type_en = 'Temporary Work';
						job.wage_zh = '$' + hourly_wage + '/小時';
						job.wage_en = '$' + hourly_wage + '/Hour';
						break;
				}
			})
			this.records = _.orderBy(records, ['last_updated_at'], ['desc']);
		})
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

	respondOffer(application_id, response: boolean) {
		if (response) {
			let data = {
				application_status: 'accepted_offer'
			}
			this.api.startQueue([
				this.api.postApplicationUpdate(application_id, data)
			]).then(response => {
				let accept_response = response[0];
				if (accept_response['status']) {
					// Applied successful
					this.utils.showAlert('', this.utils.instantLang('MSG.ACCEPT_SUCCESS'));
				} else {
					// Apply failed
					this.utils.showAlert('', this.utils.instantLang('MSG.ACCEPT_FAILED'));
				}
				this.nav.setRoot('ApplicantRecordPage');
			})
		} else {
			this.utils.showConfirm('', this.utils.instantLang('MSG.CANCEL_CONFIRM'), ()=>{
				let data = {
					application_status: 'rejected_offer'
				}
				this.api.startQueue([
					this.api.postApplicationUpdate(application_id, data)
				]).then(response => {
					let reject_response = response[0];
					if (reject_response['status']) {
						// Applied successful
						this.utils.showAlert('', this.utils.instantLang('MSG.REJECT_SUCCESS'));
					} else {
						// Apply failed
						this.utils.showAlert('', this.utils.instantLang('MSG.REJECT_FAILED'));
					}
					this.nav.setRoot('ApplicantRecordPage');
				})
			});
		}
	}

	seeJobDetail(job_id) {
		let data = { 'job_id': job_id };
		this.nav.push('ApplicantJobPage', data);
	}
}