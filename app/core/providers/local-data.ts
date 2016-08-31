import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';
import {Config} from '../../config';

/**
 * Data stored in SqlStorage, includes:
 *  - user preference
 *  - offline data
 *  - offline files
 */
@Injectable()
export class LocalData {
	
	private storage: Storage = new Storage(SqlStorage);
	
	constructor() {
		Config.DEBUG_VERBOSE && console.log('LocalData constructor');
	}
	
	set(key: string, value: any): Promise<any> {
		return this.storage.set(key, value);
	}
	
	get(key: string, default_value?: any): Promise<any> {
		return this.storage.get(key).then(data => {
			return data || default_value;
		});
	}

	remove(key: string, default_value?: any): Promise<any> {
		return this.storage.remove(key);
	}
	
	clear(): Promise<any> {
		return this.storage.clear();
	}
}