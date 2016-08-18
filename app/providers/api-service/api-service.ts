import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ToastController} from 'ionic-angular';
import {AppVersion} from 'ionic-native';
import {BaseService} from '../../core/BaseService';

@Injectable()
export class ApiService extends BaseService {
	
	// override API URL prefix 
	api_prefix: string = 'http://localhost/juicylauncher_web_v2/api';

	// default API key	
	api_key_anonymous: string = 'anonymous';
	
	constructor(
		protected http: Http,
		private toastCtrl: ToastController
	) {
		super(http);
	}
	
	// get versions later than current app version
	public getVersions() {
		return AppVersion.getVersionCode().then(app_version => {
			this.headers.append('X-API-KEY', this.api_key_anonymous);
			return this.get('/versions?from=' + app_version);
		});
	}

	// get App config from API	
	public getAppConfig() {
		this.headers.append('X-API-KEY', this.api_key_anonymous);
		return this.get('/configs');
	}
    
    // override error handling from BaseService
	// e.g. display toast message with error text
    protected handleError(error) {
        console.error('ApiService handleError', error);
		let msg = 'Error ' + error.status + ': ' + error.statusText;
		this.toastCtrl.create({
			message: msg,
			duration: 3000
		}).present();
    }
}