import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';
import * as _ from 'lodash';

/**
 * Global configuration
 */
@Injectable()
export class Config {
    
    // Constants
    public DEFAULT_LANGUAGE: string = 'zh';
    public AVAILABLE_LANGUAGES: string[] = ['zh', 'en'];
    public GA_TRACKER_ID: string = '';   // UA-000000-01
    public APP_ID_IOS: string = '';
    public APP_ID_ANDROID: string = 'com.juicyapphk.juicylauncher2';
    
    constructor() {
        console.log('Config constructor');
    }
}