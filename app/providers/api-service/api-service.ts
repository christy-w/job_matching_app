import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Platform} from 'ionic-angular';
import {Utils} from '../../core/providers/utils';
import {BaseService, ErrorObj} from '../../core/base-service';

@Injectable()
export class ApiService extends BaseService {
	
	// override API URL prefix and anonymous API key
	//protected api_prefix: string = 'http://localhost/juicylauncher2_web/api';
	protected api_prefix: string = 'http://dev.juicyapphk.com/juicylauncher2_web/api';
	protected api_key_anonymous: string = 'anonymous';
	
	constructor(http: Http, platform: Platform, utils: Utils) {
		super(http, platform, utils);
	}
	
    // (Optional) override error handling from BaseService, e.g. display toast message with error text
    protected handleError(reject, error_obj: ErrorObj) {
        console.error('ApiService > handleError() >', error_obj);
		let msg = this.utils.instantLang('MSG.ERROR') + ': ' + error_obj.message;
		this.utils.showToast(msg, 3000);
		reject(error_obj);
    }
}