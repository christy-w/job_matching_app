import {BaseApp} from './core/BaseApp';
import {App, Platform} from 'ionic-angular';
import {HomePage} from './pages/home/home';

@App({
	template: `<ion-nav [root]="mRootPage"></ion-nav>`,
	config: {
		// http://ionicframework.com/docs/v2/api/config/Config/
	},
	prodMode: false,
	pipes: [],
	providers: [],
})
export class MyApp extends BaseApp {

	// override parent values
	protected mRootPage = HomePage;
	
	constructor(platform: Platform) {
		super(platform);
	}
}
