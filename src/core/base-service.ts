import { Platform, LoadingOptions } from 'ionic-angular';
import { Config } from '../config';
import { Utils } from './providers/utils';
import { InitModel } from '../core/models';
import moment from 'moment';

/**
 * Base class for services, normally linked with remote API
 * @Injectable to be defined in child classes
 **/
export class BaseService {

    // member variables accessible from child classes
    protected api_prefix: string = '';
    protected headers: Headers = new Headers();
    protected local_key_token: string = 'API_TOKEN';
    protected local_key_prefix: string = 'API ';
    
    constructor(protected platform: Platform, protected utils: Utils) {
        this.headers.append('Content-Type', 'application/json');
    }
    
    // Common function: before each API call
    private async beforeCall(): Promise<void> {
        let token = await this.utils.getLocal(this.local_key_token);
        this.headers.append('Authorization', token);
        return Promise.resolve();
    }
    
    // Start calling list of promises, with loading spinner in between
    public async startQueue(promises: Promise<any>[], loading_opts?: LoadingOptions): Promise<any> {
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

    // Init API
    public async init(): Promise<InitModel> {
        let curr_version: string = await this.utils.currentVersion();
        let os: string = this.utils.currentOS();
        let url: string = '/init';
        let body: Object = {
            platform: os,
            device_id: '',
            version: curr_version
        };
        
        // call API
        let res: InitModel = await this.post<InitModel>(url, body);
        
        // save token to local
        await this.utils.setLocal(this.local_key_token, res.token);
        res.curr_version = curr_version;
        return Promise.resolve(res);
    }
    
    // GET request (with local data checking logic)
    protected async get<T>(url: string, local_expiry: number = Config.DEFAULT_LOCAL_EXPIRY): Promise<T> {
        if (!this.utils.isOnline()) {
            // device no connection > get local data
            return this.getLocal<T>(url, 0);
        } else if (local_expiry > 0) {
            // device has connection > check local data first
            let data = await this.getLocal<T>(url, local_expiry);
            return (data) ? Promise.resolve(data) : this.getRemote<T>(url, local_expiry);
        } else {
            // device has connection > skip local data checking, directly call API
            return this.getRemote<T>(url, local_expiry);
        }
    }

    // GET request (from local data)
    protected async getLocal<T>(url: string, local_expiry: number = 0): Promise<T> {
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
    protected async getRemote<T>(url: string, local_expiry: number = 0): Promise<T> {
        await this.beforeCall();
        let req: Request = new Request(this.api_prefix + url, {
            method: 'GET',
            headers: this.headers,
            mode: 'cors',
            cache: 'default'
        });
        return this.startFetch(req, local_expiry);
    }

    // POST request
    protected async post<T>(url: string, body: any = {}): Promise<T> {
        await this.beforeCall();
        let req: Request = new Request(this.api_prefix + url, {
            method: 'POST',
            headers: this.headers,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(body)
        });
        return this.startFetch(req);
    }

    // PUT request
    protected async put(url: string, body: any = {}): Promise<any> {
        await this.beforeCall();
        let req: Request = new Request(this.api_prefix + url, {
            method: 'PUT',
            headers: this.headers,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(body)
        });
        return this.startFetch(req);
    }

    // PATCH request
    protected async patch(url: string, body: any = {}): Promise<any> {
        await this.beforeCall();
        let req: Request = new Request(this.api_prefix + url, {
            method: 'PATCH',
            headers: this.headers,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(body)
        });
        return this.startFetch(req);
    }

    // DELETE request
    protected async delete(url: string): Promise<any> {
        await this.beforeCall();
        let req: Request = new Request(this.api_prefix + url, {
            method: 'DELETE',
            headers: this.headers,
            mode: 'cors',
            cache: 'default'
        });
        return this.startFetch(req);
    }

    // Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/
    protected async startFetch(req: Request, local_expiry: number = 0): Promise<any> {
        let short_url: string = req.url.replace(this.api_prefix, '');
        Config.DEBUG_API_REQUEST && console.log('API Request: [' + req.method + '] ' + short_url);
        return fetch(req)
            .then((res: Response) => {
                return this.handleFetchResponse(res, req.method, short_url, local_expiry);
            })
            .catch((err: TypeError) => {
                return this.handleFetchError(err, req.method, short_url);
            });
    }
    
    // Fetch API Response
    protected async handleFetchResponse(res: Response, method: string, url: string, local_expiry: number = 0): Promise<any> {
        let key: string = this.local_key_prefix + url;
        if (res.ok) {
            let data = await res.json();
            
            // API error
            if (data['err_code']) {
                let err_code: number = data['err_code'];
                let err_msg: string = data['err_msg'] || '';
                Config.DEBUG_API_REQUEST && console.error('API Error: [' + method + '] ' + url);
                Config.DEBUG_API_REQUEST && console.error('[' + err_code + '] ' + err_msg);
                let toast_msg = err_msg + ' [Code: ' + err_code + '] ';
                this.utils.showToast(toast_msg, 3000);
                return Promise.resolve(data);
            }
            
            // API Response
            Config.DEBUG_API_REQUEST && console.log('API Response: [' + method + '] ' + url, data);
            if (method == 'GET' && local_expiry > 0) {
                // save to local data for offline use
                return this.utils.setLocal(key, { data: data, last_update: moment().valueOf() }).then(res => {
                    return Promise.resolve(data);
                });
            } else {
                return Promise.resolve(data);
            }
        }
        
        // display error without throw it again
        let err: TypeError = new TypeError(res.status + ' ' + res.statusText);
        this.handleFetchError(err, method, url).catch(err => {});
    }
    
    // Fetch API Error
    protected async handleFetchError(err: TypeError, method: string, url: string): Promise<string> {
        Config.DEBUG_API_REQUEST && console.error('Fetch API Error: [' + method + '] ' + url);
        Config.DEBUG_API_REQUEST && console.error(err);
        
        // TODO: localize error message (e.g. err.name = TypeError)
        let toast_msg = this.utils.instantLang('MSG.ERROR') + ': ' + err.message;
        this.utils.showToast(toast_msg, 3000);
        return Promise.reject(toast_msg);
    }
}