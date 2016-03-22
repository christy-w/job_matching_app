import {Page, NavController} from 'ionic-angular';
import {DemoIntroPage} from '../demo-intro/demo-intro';

@Page({
    templateUrl: 'build/pages/init/init.html',
})
export class InitPage {
    constructor(private nav: NavController) {
    }

	goToIntro() {
		this.nav.setRoot(DemoIntroPage);
    }
}
