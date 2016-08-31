import {Injectable} from '@angular/core';

@Injectable()
export class Config {
    
    // Localization
    public DEFAULT_LANGUAGE: string = 'zh';
    public AVAILABLE_LANGUAGES: string[] = ['zh', 'en'];

    // Google Analytics
    public GA_TRACKER_ID: string = '';   // UA-000000-01
    public GA_DEBUG_MODE: boolean = true;
}