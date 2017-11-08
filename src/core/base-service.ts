import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Platform, LoadingOptions } from 'ionic-angular';
import { Config } from '../config';
import { Utils } from './providers/utils';
import { GetVersionResponse } from '../core/models/new-version';
import moment from 'moment';

/**
 * Base class for services, normally linked with remote API
 * @Injectable to be defined in child classes
 **/
export class BaseService {

    // member variables accessible from child classes
    protected api_prefix: string = '';
    protected headers: any = {};
    protected local_key_prefix: string = 'API ';

    constructor(protected http: HttpClient, protected platform: Platform, protected utils: Utils) {
        this.headers['Content-Type'] = 'application/json';
    }

    // Start calling list of promises, with loading spinner in between
    public startQueue(promises: Promise<any>[], loading_opts?: LoadingOptions): Promise<any> {
        let loading = this.utils.createLoading(loading_opts);
        return loading.present().then(() => {
            return Promise.all(promises).then(data => {
                loading.dismiss();
                return Promise.resolve(data);
            }).catch(err => {
                loading.dismiss();
                return Promise.reject(err);
            });
        });
    }
    
    // Get versions later than current app version
    public getVersions(): Promise<GetVersionResponse> {
        return this.utils.currentVersion().then((curr_version: string) => {
            let os: string = this.utils.currentOS();
            let url: string = '/versions?from_code=' + curr_version + '&platform=' + os;
            return this.get<GetVersionResponse>(url).then((data: GetVersionResponse) => {
                data.curr_version = curr_version;
                data.os = os;
                return Promise.resolve(data);
            });
        });
    }
    
    // Get App config
    public getAppConfig(): Promise<any> {
        return this.get('/config');
    }

    // GET request (with local data checking logic)
    protected get<T>(url: string, local_expiry: number = Config.DEFAULT_LOCAL_EXPIRY, options: any = {}): Promise<T> {
        if (!this.utils.isOnline()) {
            // device no connection > get local data
            return this.getLocal<T>(url, 0);
        } else if (local_expiry > 0) {
            // device has connection > check local data first
            return this.getLocal<T>(url, local_expiry).then(data => {
                return (data) ? Promise.resolve(data) : this.getRemote<T>(url, options);
            });
        } else {
            // device has connection > skip local data checking, directly call API
            return this.getRemote<T>(url, options);
        }
    }

    // GET request (from local data)
    protected getLocal<T>(url: string, local_expiry: number = 0): Promise<T> {
        let key: string = this.local_key_prefix + url;
        return this.utils.getLocal(key, null).then(value => {
            if (local_expiry == 0) {
                // ignore expiry > return data directly
                return (value.data) ? Promise.resolve(value.data) : Promise.resolve(value);
            } else if (value.last_update) {
                // check expiry > return null if data has expired
                let expiry = moment(value.last_update).valueOf() + local_expiry * 1000;
                let now = moment().valueOf();
                Config.DEBUG_VERBOSE && console.log('last_update', value.last_update);
                Config.DEBUG_VERBOSE && console.log('expiry', expiry);
                Config.DEBUG_VERBOSE && console.log('now', now);
                Config.DEBUG_VERBOSE && console.log('expired?', (expiry < now));
                return (expiry < now) ? Promise.resolve(null) : Promise.resolve(value.data);
            } else {
                return Promise.resolve(null);
            }
        }).catch(err => {
            return Promise.resolve(null);
        });
    }

    // GET request (from remote API)
    protected getRemote<T>(url: string, options: any = {}): Promise<T> {
        let key: string = this.local_key_prefix + url;
        url = this.api_prefix + url;
        options.headers = new HttpHeaders(this.headers);
        Config.DEBUG_API_REQUEST && console.log('API Request: [GET] ' + url);

        // proceed to send GET request
        return this.http.get<T>(url, options).toPromise().then(data => {
            if (data['error']) {
                return this.handleApiError('GET', url, data['error']);
            } else {
                // save to local data for offline use
                return this.utils.setLocal(key, { data: data, last_update: moment().valueOf() }).then(data => {
                    return Promise.resolve(data);
                });
            }
        }).catch((err: HttpErrorResponse) => {
            return this.handleHttpError('GET', url, err);
        });
    }

    // POST request
    protected post(url: string, body: any = {}, options: any = {}): Promise<any> {
        url = this.api_prefix + url;
        body = JSON.stringify(body);
        options.headers = new HttpHeaders(this.headers);
        Config.DEBUG_API_REQUEST && console.log('API Request: [POST] ' + url);

        // proceed to send POST request
        return this.http.post(url, body, options).toPromise().then(data => {
            return (data['error']) ? this.handleApiError('POST', url, data['error']) : Promise.resolve(data);
        }).catch((err: HttpErrorResponse) => {
            return this.handleHttpError('POST', url, err);
        });
    }

    // PUT request
    protected put(url: string, body: any = {}, options: any = {}): Promise<any> {
        url = this.api_prefix + url;
        body = JSON.stringify(body);
        options.headers = new HttpHeaders(this.headers);
        Config.DEBUG_API_REQUEST && console.log('API Request: [PUT] ' + url);

        // proceed to send PUT request
        return this.http.put(url, body, options).toPromise().then(data => {
            return (data['error']) ? this.handleApiError('PUT', url, data['error']) : Promise.resolve(data);
        }).catch((err: HttpErrorResponse) => {
            return this.handleHttpError('PUT', url, err);
        });
    }
    
    // PATCH request
    protected patch(url: string, body: any = {}, options: any = {}): Promise<any> {
        url = this.api_prefix + url;
        body = JSON.stringify(body);
        options.headers = new HttpHeaders(this.headers);
        Config.DEBUG_API_REQUEST && console.log('API Request: [PUT] ' + url);

        // proceed to send PATCH request
        return this.http.patch(url, body, options).toPromise().then(data => {
            return (data['error']) ? this.handleApiError('PATCH', url, data['error']) : Promise.resolve(data);
        }).catch((err: HttpErrorResponse) => {
            return this.handleHttpError('PATCH', url, err);
        });
    }

    // DELETE request
    protected delete(url: string, options: any = {}): Promise<any> {
        url = this.api_prefix + url;
        options.headers = new HttpHeaders(this.headers);
        Config.DEBUG_API_REQUEST && console.log('API Request: [DELETE] ' + url);

        // proceed to send DELETE request
        return this.http.delete(url, options).toPromise().then(data => {
            return (data['error']) ? this.handleApiError('DELETE', url, data['error']) : Promise.resolve(data);
        }).catch((err: HttpErrorResponse) => {
            return this.handleHttpError('DELETE', url, err);
        });
    }

    // Override this function from child for non-toast effect
    protected handleApiError(method: string, url: string, err: string): Promise<any> {
        Config.DEBUG_API_REQUEST && console.error('API Request: [' + method + '] ' + url, err);
        let localized_msg = this.utils.instantLang('ERROR.' + err.toUpperCase());
        let toast_msg = this.utils.instantLang('MSG.ERROR') + ': ' + localized_msg;
        this.utils.showToast(toast_msg, 3000);
        return Promise.reject(localized_msg);
    }

    // Override this function from child for non-toast effect
    protected handleHttpError(method: string, url: string, err: HttpErrorResponse): Promise<any> {
        Config.DEBUG_API_REQUEST && console.error('API Request: [' + method + '] ' + url, err);
        let localized_msg = this.utils.instantLang('ERROR.' + err.status);  // or use err.message, err.statusText
        let toast_msg = this.utils.instantLang('MSG.ERROR') + ': ' + localized_msg;
        this.utils.showToast(toast_msg, 3000);
        return Promise.reject(localized_msg);
    }
}