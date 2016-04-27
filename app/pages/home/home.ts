import {Page, Platform, ViewController, NavController} from 'ionic-angular';
import {MyPage} from '../../base/pages/MyPage';

@Page({
	templateUrl: 'build/pages/home/home.html'
})
export class HomePage extends MyPage {
	
    constructor(platform: Platform, view: ViewController, nav: NavController) {
        super(platform, view, nav);
	}
}