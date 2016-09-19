import {Http, Headers, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Platform} from 'ionic-angular';
import {AppVersion} from 'ionic-native';
import {Config} from '../config';
import {Utils} from './providers/utils';

/**
 * Base class for services, normally linked with remote API
 * @Injectable to be defined in child classes
 **/
export class BaseService {
    
    // member variables accessible from child classes
    protected api_prefix: string = '';
    protected headers: Headers = new Headers();
    
	// default API key	
	protected api_key_anonymous: string = 'anonymous';
    
    constructor(protected http: Http, protected platform: Platform, protected utils: Utils) {
        this.headers.append('Content-Type', 'application/json');
    }
    
    // GET request
    protected get(url: string, options: RequestOptionsArgs = {}): Promise<{}> {
        var url = this.api_prefix + url;
        options.headers = this.headers;
        Config.DEBUG_API_REQUEST && console.log('API Request: [GET] ' + url);
        return new Promise((resolve, reject) => {
            this.http.get(url, options)
                .map(res => res.json())
                .subscribe(
                    data => (data.error) ? this.handleCustomError(reject, data) : this.handleResponse(resolve, url, data),
                    error => this.handleHttpError(reject, error)
                )
        });
    }
    
    // POST request
    protected post(url: string, body: any = {}, options: RequestOptionsArgs = {}): Promise<{}> {
        var url = this.api_prefix + url;
        body = JSON.stringify(body);
        options.headers = this.headers;
        Config.DEBUG_API_REQUEST && console.log('API Request: [POST] ' + url);
        return new Promise((resolve, reject) => {
            this.http.post(url, body, options)
                .map(res => res.json())
                .subscribe(
                    data => (data.error) ? this.handleCustomError(reject, data) : this.handleResponse(resolve, url, data),
                    error => this.handleHttpError(reject, error)
                )
        });
    }
    
    // PUT request
    protected put(url: string, body: any = {}, options: RequestOptionsArgs = {}): Promise<{}> {
        var url = this.api_prefix + url;
        body = JSON.stringify(body);
        options.headers = this.headers;
        Config.DEBUG_API_REQUEST && console.log('API Request: [PUT] ' + url);
        return new Promise((resolve, reject) => {
            this.http.put(url, body, options)
                .map(res => res.json())
                .subscribe(
                    data => (data.error) ? this.handleCustomError(reject, data) : this.handleResponse(resolve, url, data),
                    error => this.handleHttpError(reject, error)
                )
        })
    }
    
    // DELETE request
    protected delete(url: string, options: RequestOptionsArgs = {}): Promise<{}> {
        var url = this.api_prefix + url;
        options.headers = this.headers;
        Config.DEBUG_API_REQUEST && console.log('API Request: [DELETE] ' + url);
        return new Promise((resolve, reject) => {
            this.http.delete(url, options)
                .map(res => res.json())
                .subscribe(
                    data => (data.error) ? this.handleCustomError(reject, data) : this.handleResponse(resolve, url, data),
                    error => this.handleHttpError(reject, error)
                )
        });
    }

    // Common function to handle responses
    protected handleResponse(resolve, url: string, data: any) {
        Config.DEBUG_API_REPONSE && console.log('API Response: ' + url, data);
        resolve(data);
    }

    // Common function to handle errors
    protected handleError(reject, error_obj: ErrorObj) {
        console.error('BaseService handleError', error_obj);
        reject(error_obj);
    }
    
    // Handle error from API (based on CI Bootstrap 3)
    protected handleCustomError(reject, data) {
        console.error('BaseService handleCustomError', data);
        let obj: ErrorObj = {
            code: 200,
            message: this.utils.instantLang('ERROR.' + data.error.toUpperCase())
        }
        this.handleError(reject, obj);
    }
    
    // Handle error from Http module
    protected handleHttpError(reject, error) {
        console.error('BaseService handleHttpError', error);
        let obj: ErrorObj = {
            code: error.status,
            message: this.utils.instantLang('ERROR.' + error.status)
        }
        this.handleError(reject, obj);
    }
	
	// Get versions later than current app version
	public getVersions() {
		var platform_name: string = 'web';
		if (this.platform.is('android')) {
			platform_name = 'android';
		} else if (this.platform.is('ios')) {
			platform_name = 'ios';
        }
        console.log('BaseService > getVersions() > Platform = ' + platform_name);
		
		if (this.platform.is('cordova') && (platform_name == 'android' || platform_name == 'ios')) {
		    // cordova environment: check latest version from server
			return AppVersion.getVersionNumber().then(version_code => {
				console.log('version_code', version_code);
				this.headers.append('X-API-KEY', this.api_key_anonymous);
				var url = '/versions?from_code=' + version_code + '&platform=' + platform_name;
				return this.get(url).then(data => {
					return {
						curr_version_code: version_code,
						new_versions: data
					};
				});
			}).catch(error => {
				console.error('ApiService > getVersions() >', error);
			});
        } else {
            // non-cordova environment: return empty promise
			return new Promise((resolve, reject) => {
				return resolve();
			});
		}
	}
	
	// Get App config
	public getAppConfig() {
		this.headers.append('X-API-KEY', this.api_key_anonymous);
		return this.get('/config');
	}
}

// Custom error object for JuicyLauncher 2
export class ErrorObj {
    public code: number;
    public message: string;
}