import {Page, Platform, ViewController, NavController} from 'ionic-angular';
import {BasePage} from '../../core/BasePage';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Page({
    templateUrl: 'build/pages/home/home.html',
    pipes: [TranslatePipe]
})
export class HomePage extends BasePage {
	
    constructor(platform: Platform, view: ViewController, nav: NavController) {
        super(platform, view, nav);
    }
    
    onPageLoaded() {
        // TODO: check version to decide force upgrade or not
        // TODO: download initial data
    }
}