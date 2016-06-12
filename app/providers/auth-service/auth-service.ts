import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';

import {Config} from '../config';
import {LocalData} from '../../core/providers/local-data';

/**
 * Authentication handling
 */
@Injectable()
export class AuthService {

	private KEY_LOGGED_IN: string = 'logged_in';
	private KEY_USERNAME: string = 'username';
	
	constructor(
		private events: Events, 
		private local: LocalData) {
	}
	
	login(username): void {
		this.local.set(this.KEY_LOGGED_IN, true);
		this.local.set(this.KEY_USERNAME, username);
		this.events.publish('auth:login');
	}
	
	signup(username): void {
		this.local.set(this.KEY_LOGGED_IN, true);
		this.local.set(this.KEY_USERNAME, username);
		this.events.publish('auth:signup');
	}

	logout(): void {
		this.local.remove(this.KEY_LOGGED_IN);
		this.local.remove(this.KEY_USERNAME);
		this.events.publish('auth:logout');
	}
	
	getUsername(): Promise<string> {
		return this.local.get(this.KEY_USERNAME).then((value) => {
			return value;
		})
	}
	
	hasLoggedIn(): Promise<boolean> {
		return this.local.get(this.KEY_LOGGED_IN).then((value) => {
			return value;
		});
	}
}