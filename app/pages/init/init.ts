import {Loading, Page, NavController} from 'ionic-angular';
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
export class InitPage {

    mLoading: Loading;
    mUpgradeType: UpgradeType = UpgradeType.NoUpgrade;
    
    constructor(private nav: NavController) {
        // start loading spinner
        this.mLoading = Loading.create({
            content: "Loading..."
        });
        this.nav.present(this.mLoading);
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
        this.mLoading.dismiss();
		this.nav.setRoot(HomePage);
    }
}
