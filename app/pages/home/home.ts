import {Page, Platform, ViewController, NavController} from 'ionic-angular';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {BasePage} from '../../core/BasePage';
import {LanguageSelector} from '../../core/providers/language-selector';

@Page({
    templateUrl: 'build/pages/home/home.html',
    pipes: [TranslatePipe]
})
export class HomePage extends BasePage {
	
    constructor(
        protected platform: Platform,
        protected view: ViewController,
        protected nav: NavController,
        private language: LanguageSelector
    ) {
        super(platform, view, nav);
		console.log('HomePage constructor');
    }

    // pass function to view
    changeLang(value) {
        this.language.changeLang(value);
    }
    
    onPageLoaded() {
        // TODO: download initial data
    }
}