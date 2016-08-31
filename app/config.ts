/**
 * Global constants and configuration values
 */
export class Config {
    
    // Localization
    static DEFAULT_LANGUAGE: string = 'zh';
    static AVAILABLE_LANGUAGES: string[] = ['zh', 'en'];
    
    // Google Analytics (set GA_TRACKER_ID as empty to disable)
    static GA_TRACKER_ID: string = '';   // UA-000000-01
    static GA_DEBUG_MODE: boolean = true;
    
    // Push Notifications (set ONESIGNAL_APP_ID as empty to disable)
    static ONESIGNAL_APP_ID: string = 'd284b536-47d9-11e5-a647-478fe54bb917';
    static ONESIGNAL_GOOGLE_PROJECT_NUMBER: string = '606380984953';
}