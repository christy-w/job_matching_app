import {Config} from '../../config';
import {Injectable} from '@angular/core';
import {Storage, SqlStorage, Events} from 'ionic-angular';

/**
 * Authentication handling
 */
@Injectable()
export class AuthService {

	// setup SqlStorage (instead of LocalStorage)
	private storage = new Storage(SqlStorage, Config.SQLSTORAGE_OPTIONS);
	
	constructor(private events: Events) {
	}
	
	login(username): void {
		this.storage.set(Config.STORAGE_LOGGED_IN, true);
		this.storage.set('username', username);
		this.events.publish('user:login');
	}
	
	signup(username): void {
		this.storage.set(Config.STORAGE_LOGGED_IN, true);
		this.storage.set('username', username);
		this.events.publish('user:signup');
	}

	logout(): void {
		this.storage.remove(Config.STORAGE_LOGGED_IN);
		this.storage.remove('username');
		this.events.publish('user:logout');
	}
	
	getUsername(): Promise<string> {
		return this.storage.get('username').then((value) => {
			return value;
		})
	}
	
	hasLoggedIn(): Promise<boolean> {
		return this.storage.get(Config.STORAGE_LOGGED_IN).then((value) => {
			return value;
		});
	}
}