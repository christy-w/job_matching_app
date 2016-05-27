import {Injectable} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

import * as _ from 'lodash';
import {Config} from '../../providers/config';
import {LocalData} from './local-data';

/**
 * Multilingual handling
 */

// keys to save local storage
const STORAGE_UI_LANGUAGE: string = 'UI_LANGUAGE';

@Injectable()
export class LanguageSelector {
    
    constructor(
        private translate: TranslateService,
        private config: Config,
        private local: LocalData
    ) {
        console.log('LanguageSelector constructor');
        
		// get stored interface language
        this.local.get(STORAGE_UI_LANGUAGE, this.config.DEFAULT_LANGUAGE).then(value => {
            let userLang: string;
            this.translate.setDefaultLang(this.config.DEFAULT_LANGUAGE);
            
            if (value) {
                userLang = value;
            } else {
                userLang = navigator.language.split('-')[0]; // use navigator lang if available
                userLang = /(zh|en)/gi.test(userLang) ? userLang : this.config.DEFAULT_LANGUAGE;
            }
            this.translate.use(userLang);
        });
	}
	
	// change language
    changeLang(value) {
        // change language only when the target value is within "available list"
        if (_.includes(this.config.AVAILABLE_LANGUAGES, value)) {
			this.local.set(STORAGE_UI_LANGUAGE, value);
            this.translate.use(value);
        }
    }
    
    get(key: string | string[], params: Object = null): Promise<any> {
        return this.translate.get(key).toPromise();
    }
    
    instant(key: string | string[], params: Object = null): string {
        return this.translate.instant(key, params);
    }
}