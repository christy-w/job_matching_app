import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Utils } from '../core/providers/utils';
import { BaseService } from '../core/base-service';

@Injectable()
export class Api extends BaseService {
	
	// override API URL prefix and anonymous API key
	//protected api_prefix: string = 'https://dev.juicyapphk.com/juicycore/api';
	protected api_prefix: string = 'http://localhost/fyp_web/api';
	protected api_key_anonymous: string = 'anonymous';
	protected user_api_key: string = '';
	protected user_id: string = '';

	constructor(platform: Platform, utils: Utils) {
		super(platform, utils);
		this.utils.getLocal('USER_AUTH').then(auth => {
			if (auth) {
				this.user_api_key = auth.api_key;
				this.user_id = auth.id
				console.log('user_api_key', this.user_api_key);
				console.log('user_id', this.user_id);
			}
		})
	}

	// POST /Auth
	public postSignUpApplicant(data) {
		this.headers.set('X-API-KEY', this.api_key_anonymous);
		return this.post('/auth/sign_up', data);
	}

	public postActivate(data) {
		this.headers.set('X-API-KEY', this.api_key_anonymous);
		return this.post('/auth/activate', data);
	}

	public postLogin(data) {
		this.headers.set('X-API-KEY', this.api_key_anonymous);
		return this.post('/auth/login', data);
	}

	public postForgetPassword(data) {
		this.headers.set('X-API-KEY', this.api_key_anonymous);
		return this.post('/auth/forgot_password', data);
	}

	public postResetPassword(data) {
		this.headers.set('X-API-KEY', this.api_key_anonymous);
		return this.post('/auth/reset_password', data);
	}

	// POST and GET /Applicants
	public postUpdateApplicant(data) {
		this.headers.set('X-API-KEY', this.user_api_key);
		return this.post('/applicant/update', data);
	}

	public getApplicantProfile() {
		let url = '/applicant/' + this.user_id;
		return this.get(url);
	}

	/*--- GET ---*/
	public getAllJobs() {
		let url = '/job';
		return this.get(url);
	}

	public getJobDetail(job_id) {
		let url = '/job/' + job_id;
		return this.get(url);
	}

	public getSystemInfo(name) {
		let url = '/system/' + name;
		return this.get(url);
	}
}