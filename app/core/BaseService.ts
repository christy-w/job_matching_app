//import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {LocalData} from './providers/local-data';

/**
 * Base class for services, normally linked with remote API
 * @Injectable to be defined in child classes
 **/
export class BaseService {

    // member variables accessible from child classes
    protected mHttp: Http;
    protected mApiPrefix: string = '';
    
    constructor(http: Http) {
        this.mHttp = http;
    }
    
    // GET request
    protected get(url: string, options: RequestOptionsArgs = null) {
        var url = this.mApiPrefix + url;
        options.headers = this.getHeaders();
        return this.mHttp.get(url, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    // POST request
    protected post(url: string, body: string = '', options: RequestOptionsArgs = null) {
        var url = this.mApiPrefix + url;
        options.headers = this.getHeaders();
        return this.mHttp.post(url, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    // PUT request
    protected put(url: string, body: string = '', options: RequestOptionsArgs = null) {
        var url = this.mApiPrefix + url;
        options.headers = this.getHeaders();
        return this.mHttp.put(url, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    // DELETE request
    protected delete(url: string, body: string = '', options: RequestOptionsArgs = null) {
        var url = this.mApiPrefix + url;
        options.headers = this.getHeaders();
        return this.mHttp.delete(url, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    // HEAD request
    protected head(url: string, options: RequestOptionsArgs = null) {
        var url = this.mApiPrefix + url;
        options.headers = this.getHeaders();
        return this.mHttp.head(url, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    // PATCH request
    protected patch(url: string, body: string = '', options: RequestOptionsArgs = null) {
        var url = this.mApiPrefix + url;
        options.headers = this.getHeaders();
        return this.mHttp.patch(url, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    // error handling
    protected handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    protected getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}