import {Page, Platform, ViewController, NavController} from 'ionic-angular';
import {BasePage} from '../../core/BasePage';

@Page({
	templateUrl: 'build/pages/home/home.html'
})
export class HomePage extends BasePage {
	
    constructor(platform: Platform, view: ViewController, nav: NavController) {
        super(platform, view, nav);
	}
}