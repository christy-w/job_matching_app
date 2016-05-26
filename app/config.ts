/**
 * Global Constants
 */
export class Config {

    // Default setting values
    public static DEFAULT_LANGUAGE: string = '';
    public static AVAILABLE_LANGUAGES: string[] = ['zh', 'en'];
    
    // Analytics platforms
    public static GA_TRACKER_ID: string = '';   // UA-000000-01
    
    // Links to App Store and Play Store
    public static APP_ID_IOS: string = '';
    public static APP_ID_ANDROID: string = 'com.juicyapphk.juicylauncher2';
    
    // Ionic SqlStorage, and keys to store data
    public static SQLSTORAGE_OPTIONS: Object = {};
    public static STORAGE_LOGGED_IN: string = 'HAS_LOGGED_IN';
    public static STORAGE_UI_LANGUAGE: string = 'UI_LANGUAGE';
    public static STORAGE_USER: string = 'APP_USER';
}