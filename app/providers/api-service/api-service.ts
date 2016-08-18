import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseService} from '../../core/BaseService';

@Injectable()
export class VersionService extends BaseService {
	
	api_prefix: string = 'http://dev.juicyapphk.com/';
	
	constructor(protected http: Http) {
		super(http);
	}

	// Sample Functions
	/*
	getPosts() {
		this.headers.append('X-API-KEY', 'anonymous');
		return this.get('/posts');
	}
	*/
}