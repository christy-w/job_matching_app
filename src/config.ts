/**
 * Global constants and configuration values
 */
export class Config {
    
    static JUICYLAUNCHER_VERSION: string = 'build 20161118';
    
    // For development purpose at non-cordova environment    
    static APP_VERSION: string = '1.0.0';

    // Localization
    static DEFAULT_LANGUAGE: string = 'zh';
    static AVAILABLE_LANGUAGES: string[] = ['zh', 'en'];

    // Local data
    static LOCAL_DATA_EXPIRY: number = 3600; // unit: seconds

    // Google Analytics (set GA_TRACKER_ID as empty to disable)
    static GA_TRACKER_ID: string = '';   // UA-000000-01
    static GA_DEBUG_MODE: boolean = true;

    // Push Notifications (set ONESIGNAL_APP_ID as empty to disable)
    static ONESIGNAL_APP_ID: string = 'd284b536-47d9-11e5-a647-478fe54bb917';
    static ONESIGNAL_GOOGLE_PROJECT_NUMBER: string = '606380984953';

    // In-App Browser
    static BROWSER_STATUSBAR_COLOR: string = '#ffffffff';
    static BROWSER_TOOBAR_COLOR: string = '#f0f0f0ff';
    static BROWSER_TITLE_COLOR: string = '#003264ff';

    // Turn on/off debug messages
    static DEBUG_VERBOSE: boolean = false;				// Messages for non-critical points
    static DEBUG_API_REQUEST: boolean = true;			// Messages before API requests
    static DEBUG_API_REPONSE: boolean = true;			// Messages upon receiving API responses
    static DEBUG_LOCAL_DATA: boolean = true;            // Messages related to local data & storage
    static DEBUG_ANALYTICS: boolean = true;				// Messages related to Analytics platform (e.g. Google Analytics)
    static DEBUG_PUSH_NOTIFICATION: boolean = false;	// Messages related to push notifications (e.g. OneSignal) 
}