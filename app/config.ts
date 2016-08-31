import {Injectable} from '@angular/core';

@Injectable()
export class Config {
    
    // Localization
    public DEFAULT_LANGUAGE: string = 'zh';
    public AVAILABLE_LANGUAGES: string[] = ['zh', 'en'];
    
    // Google Analytics (set GA_TRACKER_ID as empty to disable)
    public GA_TRACKER_ID: string = '';   // UA-000000-01
    public GA_DEBUG_MODE: boolean = true;
    
    // Push Notifications (set ONESIGNAL_APP_ID as empty to disable)
    public ONESIGNAL_APP_ID: string = 'd284b536-47d9-11e5-a647-478fe54bb917';
    public ONESIGNAL_GOOGLE_PROJECT_NUMBER: string = '606380984953';
}