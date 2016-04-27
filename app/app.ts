import {Config} from './config';
import {BaseApp} from './core/BaseApp';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {InitPage} from './pages/init/init';

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
	protected mRootPage: any = InitPage;
	
	constructor(platform: Platform) {
		super(platform);
	}
}
