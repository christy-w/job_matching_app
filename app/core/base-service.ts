import {Http, Headers, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Utils} from './providers/utils';

/**
 * Base class for services, normally linked with remote API
 * @Injectable to be defined in child classes
 **/
export class BaseService {
    
    // member variables accessible from child classes
    protected api_prefix: string = '';
    protected headers: Headers = new Headers();
    
    constructor(protected http: Http, protected utils?: Utils) {
        this.headers.append('Content-Type', 'application/json');
    }
    
    // GET request
    protected get(url: string, options: RequestOptionsArgs = {}): Promise<{}> {
        var url = this.api_prefix + url;
        options.headers = this.headers;
        return new Promise((resolve, reject) => {
            this.http.get(url, options)
                .map(res => res.json())
                .subscribe(
                    data => (data.error) ? this.handleCustomError(reject, data) : resolve(data),
                    error => this.handleHttpError(reject, error)
                )
        });
    }
    
    // POST request
    protected post(url: string, body: any = {}, options: RequestOptionsArgs = {}): Promise<{}> {
        var url = this.api_prefix + url;
        body = JSON.stringify(body);
        options.headers = this.headers;
        return new Promise((resolve, reject) => {
            this.http.post(url, body, options)
                .map(res => res.json())
                .subscribe(
                    data => (data.error) ? this.handleCustomError(reject, data) : resolve(data),
                    error => this.handleHttpError(reject, error)
                )
        });
    }
    
    // PUT request
    protected put(url: string, body: any = {}, options: RequestOptionsArgs = {}): Promise<{}> {
        var url = this.api_prefix + url;
        body = JSON.stringify(body);
        options.headers = this.headers;
        return new Promise((resolve, reject) => {
            this.http.put(url, body, options)
                .map(res => res.json())
                .subscribe(
                    data => (data.error) ? this.handleCustomError(reject, data) : resolve(data),
                    error => this.handleHttpError(reject, error)
                )
        })
    }
    
    // DELETE request
    protected delete(url: string, options: RequestOptionsArgs = {}): Promise<{}> {
        var url = this.api_prefix + url;
        options.headers = this.headers;
        return new Promise((resolve, reject) => {
            this.http.delete(url, options)
                .map(res => res.json())
                .subscribe(
                    data => (data.error) ? this.handleCustomError(reject, data) : resolve(data),
                    error => this.handleHttpError(reject, error)
                )
        });
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