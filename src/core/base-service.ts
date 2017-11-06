import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform, LoadingOptions } from 'ionic-angular';
import { Config } from '../config';
import { Utils } from './providers/utils';
import { NewVersionList } from './models/new-version';
import { ErrorObj } from './models/error-obj';
import moment from 'moment';

/**
 * Base class for services, normally linked with remote API
 * @Injectable to be defined in child classes
 **/
export class BaseService {
    
    // member variables accessible from child classes
    protected api_prefix: string = '';
    protected headers: HttpHeaders = new HttpHeaders();
    protected local_key_prefix: string = 'API ';
    
    constructor(protected http: HttpClient, protected platform: Platform, protected utils: Utils) {
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
    public getVersions(from_code: string, platform: string): Promise<NewVersionList> {
        if (!platform) {
            return Promise.resolve(null);
        } else {
            let url: string = '/versions?from_code=' + from_code + '&platform=' + platform;
            return this.get(url);
        }
    }

    // Get App config
    public getAppConfig() {
        return this.get('/config');
    }
    
    // GET request (with local data checking logic)
    protected get(url: string, local_expiry: number = Config.DEFAULT_LOCAL_EXPIRY, options: any = {}): Promise<{}> {

        if (!this.utils.isOnline()) {
            // device no connection > get local data
            return this.getLocal(url, 0);
        } else if (local_expiry > 0) {
            // device has connection > check local data first
            return this.getLocal(url, local_expiry).then(data => {
                return (data) ? data : this.getRemote(url, options);
            });
        } else {
            // device has connection > skip local data checking, directly call API
            return this.getRemote(url, options);
        }
    }
    
    // GET request (from local data)
    protected getLocal(url: string, local_expiry: number = 0): Promise<{}> {
        let key: string = this.local_key_prefix + url;
        return this.utils.getLocal(key, null).then(value => {
            if (local_expiry==0) {
                // ignore expiry > return data directly
                return (value.data) ? value.data : value;
            } else if (value.last_update) {
                // check expiry > return null if data has expired
                let expiry = moment(value.last_update).valueOf() + local_expiry * 1000;
                let now = moment().valueOf();
                Config.DEBUG_VERBOSE && console.log('last_update', value.last_update);
                Config.DEBUG_VERBOSE && console.log('expiry', expiry);
                Config.DEBUG_VERBOSE && console.log('now', now);
                Config.DEBUG_VERBOSE && console.log('expired?', (expiry < now));
                return (expiry < now) ? null : value.data;
            } else {
                return null;
            }
        }).catch(err => {
            return null;
        });
    }

    // GET request (from remote API)
    protected getRemote(url: string, options: any = {}): Promise<{}> {
        let key: string = this.local_key_prefix + url;
        url = this.api_prefix + url;
        options.headers = this.headers;
        Config.DEBUG_API_REQUEST && console.log('API Request: [GET] ' + url);
        return new Promise((resolve, reject) => {
            this.http.get(url, options)
                .subscribe(data => {
                    if (data['error']) {
                        this.handleCustomError(reject, data);
                    } else {
                        // save to local data for offline use
                        let value = {
                            data: data,
                            last_update: moment().valueOf()
                        }
                        this.utils.setLocal(key, value).then(() => {
                            this.handleResponse(resolve, url, data);
                        });
                    }
                }, error => this.handleHttpError(reject, error));
        });
    }

    // POST request
    protected post(url: string, body: any = {}, options: any = {}): Promise<{}> {
        url = this.api_prefix + url;
        body = JSON.stringify(body);
        options.headers = this.headers;
        Config.DEBUG_API_REQUEST && console.log('API Request: [POST] ' + url);
        return new Promise((resolve, reject) => {
            this.http.post(url, body, options)
                .subscribe(
                data => (data['error']) ? this.handleCustomError(reject, data) : this.handleResponse(resolve, url, data),
                error => this.handleHttpError(reject, error)
                )
        });
    }

    // PUT request
    protected put(url: string, body: any = {}, options: any = {}): Promise<{}> {
        url = this.api_prefix + url;
        body = JSON.stringify(body);
        options.headers = this.headers;
        Config.DEBUG_API_REQUEST && console.log('API Request: [PUT] ' + url);
        return new Promise((resolve, reject) => {
            this.http.put(url, body, options)
                .subscribe(
                data => (data['error']) ? this.handleCustomError(reject, data) : this.handleResponse(resolve, url, data),
                error => this.handleHttpError(reject, error)
                )
        })
    }

    // DELETE request
    protected delete(url: string, options: any = {}): Promise<{}> {
        url = this.api_prefix + url;
        options.headers = this.headers;
        Config.DEBUG_API_REQUEST && console.log('API Request: [DELETE] ' + url);
        return new Promise((resolve, reject) => {
            this.http.delete(url, options)
                .subscribe(
                data => (data['error']) ? this.handleCustomError(reject, data) : this.handleResponse(resolve, url, data),
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