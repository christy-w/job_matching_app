import {Page, NavController} from 'ionic-angular';
import {DemoIntroPage} from '../demo-intro/demo-intro';
import {DemoListPage} from '../demo-list/demo-list';
//import {DemoSidemenuPage} from '../demo-sidemenu/demo-sidemenu';
//import {DemoTabPage} from '../demo-tab/demo-tab';

@Page({
	templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

	// enable navPush to these pages
	mDemoIntroPage = DemoIntroPage;
	mDemoListPage = DemoListPage;
	
	constructor(private nav: NavController) {
	}
}