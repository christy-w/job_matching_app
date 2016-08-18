import {Http, Headers, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Network} from 'ionic-native';

/**
 * Base class for services, normally linked with remote API
 * @Injectable to be defined in child classes
 **/
export class BaseService {
    
    // member variables accessible from child classes
    protected api_prefix: string = '';
    protected headers: Headers = new Headers();
    
    constructor(protected http: Http) {
        this.headers.append('Content-Type', 'application/json');
        console.log('Network.connection: ' + Network.connection);
    }
    
    // GET request
    protected get(url: string, options: RequestOptionsArgs = {}): Promise<{}> {
        var url = this.api_prefix + url;
        options.headers = this.headers;
        return new Promise(resolve => {
            this.http.get(url, options)
                .map(res => res.json())
                .subscribe(
                    data => resolve(data),
                    error => this.handleError(error)
                )
        });
    }
    
    // POST request
    protected post(url: string, body: any = {}, options: RequestOptionsArgs = {}): Promise<{}> {
        var url = this.api_prefix + url;
        body = JSON.stringify(body);
        options.headers = this.headers;
        return new Promise(resolve => {
            this.http.post(url, body, options)
                .map(res => res.json())
                .subscribe(
                    data => resolve(data),
                    error => this.handleError(error)
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
                    data => resolve(data),
                    error => this.handleError(error)
                )
        })
    }
    
    // DELETE request
    protected delete(url: string, options: RequestOptionsArgs = {}): Promise<{}> {
        var url = this.api_prefix + url;
        options.headers = this.headers;
        return new Promise(resolve => {
            this.http.delete(url, options)
                .map(res => res.json())
                .subscribe(
                    data => resolve(data),
                    error => this.handleError(error)
                )
        });
    }
    
    // error handling
    protected handleError(error) {
        console.error('BaseService handleError', error);
    }
}