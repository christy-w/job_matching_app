import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ToastController} from 'ionic-angular';
import {AppVersion} from 'ionic-native';
import {Utils} from '../../core/providers/utils';
import {BaseService, ErrorObj} from '../../core/BaseService';

@Injectable()
export class ApiService extends BaseService {
	
	// override API URL prefix
	//api_prefix: string = 'http://localhost/juicylauncher2_web/api';
	api_prefix: string = 'http://dev.juicyapphk.com/juicylauncher2_web/api';

	// default API key	
	api_key_anonymous: string = 'anonymous';
	
	constructor(
		protected http: Http,
		protected utils: Utils
	) {
		super(http);
	}
	
	// get versions later than current app version
	public getVersions() {
		return AppVersion.getVersionNumber().then(version_code => {
			console.log('version_code', version_code);
			this.headers.append('X-API-KEY', this.api_key_anonymous);
			return this.get('/versions?from_code=' + version_code).then(data => {
				return {
					curr_version_code: version_code,
					new_versions: data
				};
			});
		}).catch(error => {
			console.error('ApiService > getVersions() >', error);
		});
	}
	
	// get App config from API	
	public getAppConfig() {
		this.headers.append('X-API-KEY', this.api_key_anonymous);
		return this.get('/config');
	}
	
    // (Optional) override error handling from BaseService, e.g. display toast message with error text
    protected handleError(reject, error_obj: ErrorObj) {
        console.error('ApiService > handleError() >', error_obj);
		let msg = this.utils.instantLang('MSG.ERROR') + ': ' + error_obj.message;
		this.utils.showToast(msg, 3000);
		reject(error_obj);
    }
}