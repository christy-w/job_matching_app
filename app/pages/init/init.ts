import {Page, Platform, ViewController, NavController} from 'ionic-angular';
import {MyPage} from '../../core/MyPage';
import {HomePage} from '../home/home';

enum UpgradeType {
	NoUpgrade,
	PatchUpgrade,
	FeatureUpgrade,
	MajorUpgrade,
	ForceUpgrade
}

@Page({
    templateUrl: 'build/pages/init/init.html',
})
export class InitPage extends MyPage {

    mUpgradeType: UpgradeType = UpgradeType.NoUpgrade;
    
    constructor(platform: Platform, view: ViewController, nav: NavController) {
        super(platform, view, nav);
        
        // start loading spinner
        this.showLoading();
        this.downloadData();
    }
    
    // TODO: download data via remote API    
    downloadData() {
        this.checkUpgrade();
        this.checkAuth();
        
        // TODO: redirect page after download, instead of 1 second delay
        setTimeout(() => {
            this.startApp();
        }, 1000);
    }
    
    // TODO: check latest app version and upgrade status    
    checkUpgrade() {
		switch (this.mUpgradeType)
		{
			case UpgradeType.NoUpgrade:
				break;
		}
    }
    
    // TODO: check user login    
    checkAuth() {
    }
    
    // close loading spinner and redirect page
    startApp() {
        this.hideLoading();
		this.mNav.setRoot(HomePage);
    }
}
