import {Injectable} from '@angular/core';

/**
 * Global app configuration
 */
@Injectable()
export class Config {
    
    public DEFAULT_LANGUAGE: string = 'zh';
    public AVAILABLE_LANGUAGES: string[] = ['zh', 'en'];
    public GA_TRACKER_ID: string = '';   // UA-000000-01
    public APP_ID_IOS: string = '';
    public APP_ID_ANDROID: string = 'com.juicyapphk.juicylauncher2';
    
    constructor() {
        console.log('Config constructor');
    }
}