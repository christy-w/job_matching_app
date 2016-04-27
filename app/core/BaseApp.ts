/**
 * Base class for application, with common workflow when upon app start
 * @App to be defined in child classes
 **/

import {Config} from '../config';
import {Platform, Storage, SqlStorage, Loading} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

export class BaseApp {

	// member variables accessible from child classes
    protected mPlatform: Platform;
	protected mStorage: Storage;
	protected mRootPage: any;
	
    constructor(platform: Platform) {
        this.mPlatform = platform;
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			
			// setup SqlStorage (instead of LocalStorage)
			this.mStorage = new Storage(SqlStorage, Config.SQLSTORAGE_OPTIONS);
		});
	}
}
