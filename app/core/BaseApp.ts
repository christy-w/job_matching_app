/**
 * Base class for application, with common workflow when upon app start
 * @App to be defined in child classes
 **/

import {Config} from '../config';
import {Platform, Storage, SqlStorage, Loading} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TranslateService} from 'ng2-translate/ng2-translate';

export class BaseApp {

	// member variables accessible from child classes
    protected mPlatform: Platform;
	protected mTranslate: TranslateService;
	protected mStorage: Storage;
	protected mRootPage: any;
	
    constructor(platform: Platform, translate: TranslateService) {
        this.mPlatform = platform;
		this.mTranslate = translate;
		
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			
			// setup SqlStorage (instead of LocalStorage)
			this.mStorage = new Storage(SqlStorage, Config.SQLSTORAGE_OPTIONS);
			
			// get stored language
			this.mStorage.get('language').then(key => {
				let userLang: string;
				translate.setDefaultLang(Config.DEFAULT_LANGUAGE);
				
				if (key) {
					userLang = key;
				} else {
					userLang = navigator.language.split('-')[0]; // use navigator lang if available
					userLang = /(zh|en)/gi.test(userLang) ? userLang : Config.DEFAULT_LANGUAGE;
				}
				translate.use(userLang);
			});
		});
	}
}
