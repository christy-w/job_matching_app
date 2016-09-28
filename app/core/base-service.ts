import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Platform, Loading, LoadingOptions } from 'ionic-angular';
import { Config } from '../config';
import { Utils } from './providers/utils';
import { AppVersion } from '../models/app-version';

/**
 * Base class for services, normally linked with remote API
 * @Injectable to be defined in child classes
 **/
export class BaseService {
    
    // member variables accessible from child classes
    protected api_prefix: string = '';
	protected api_key_anonymous: string = 'anonymous';
    protected headers: Headers = new Headers();
    protected local_key_prefix: string = 'API ';
    
    constructor(protected http: Http, protected platform: Platform, protected utils: Utils) {
        this.headers.set('Content-Type', 'application/json');
    }
    
    // Start calling list of promises, with loading spinner in between
    public startQueue(promises: Promise<any>[], loading_opts?: LoadingOptions): Promise<any> {
        let loading = this.utils.createLoading();
        return loading.present().then(() => {
            return Promise.all(promises).then(data => {
                loading.dismiss();
                return data;
            }).catch(err => {
                loading.dismiss();
                return err;
            });
        });
    }
    
	// Get versions later than current app version
    public getVersions(from_code: string, platform: string): Promise<AppVersion[]> {
        this.headers.set('X-API-KEY', this.api_key_anonymous);
        let url: string = '/versions?from_code=' + from_code + '&platform=' + platform;
        return this.get(url);
	}
	
	// Get App config
	public getAppConfig() {
		this.headers.set('X-API-KEY', this.api_key_anonymous);
		return this.get('/config');
    }
    
    // GET request (with local data checking logic)
    protected get(url: string, check_local: boolean = false, options: RequestOptionsArgs = {}): Promise<{}> {
        if (!check_local) {
            // skip local data checking, directly call API
            return this.getRemote(url, options);
        } else {
            // check local data first
            let key: string = this.local_key_prefix + url;
            return this.utils.getLocal(key, null, true).then(data => {
                // return local data, or call API if not found
                return (data) ? data : this.getRemote(url, options);
            }).catch(err => {
                // call API if error occurs
                return this.getRemote(url, options);
            });
        }
    }
    
    // GET request (from remote API)
    protected getRemote(url: string, options: RequestOptionsArgs = {}): Promise<{}> {
        let key: string = this.local_key_prefix + url;
        url = this.api_prefix + url;
        options.headers = this.headers;
        Config.DEBUG_API_REQUEST && console.log('API Request: [GET] ' + url);
        return new Promise((resolve, reject) => {
            this.http.get(url, options)
                .map(res => res.json())
                .subscribe(data => {
                    if (data.error) {
                        this.handleCustomError(reject, data);
                    } else {
                        // save to local data for offline use
                        this.utils.setLocal(key, data, true).then(() => {
                            this.handleResponse(resolve, url, data);
                        });
                    }
                }, error => this.handleHttpError(reject, error));
        });
    }
    
    // POST request
    protected post(url: string, body: any = {}, options: RequestOptionsArgs = {}): Promise<{}> {
        url = this.api_prefix + url;
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
        url = this.api_prefix + url;
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
        url = this.api_prefix + url;
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
}

// Custom error object for JuicyLauncher 2
export class ErrorObj {
    public code: number;
    public message: string;
}