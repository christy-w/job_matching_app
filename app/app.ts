import {Config} from './config';
import {RouteConfig, RouterLink} from 'angular2/router';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {InitPage} from './pages/init/init';
import {HomePage} from './pages/home/home';
import {DemoIntroPage} from './pages/demo-intro/demo-intro';
import {DemoListPage} from './pages/demo-list/demo-list';
import {DemoDetailPage} from './pages/demo-detail/demo-detail';

@App({
	template: '<ion-nav [root]="rootPage"></ion-nav>',
	config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
@RouteConfig([
	{
		path: '/home',
		component: HomePage,
		as: 'Home'
	},
	{
		path: '/demo-intro',
		component: DemoIntroPage,
		as: 'DemoIntro'
	},
	{
		path: '/demo-list',
		component: DemoListPage,
		as: 'DemoList'
	},
	{
		path: '/demo-detail',
		component: DemoDetailPage,
		as: 'DemoDetail'
	}
])
export class MyApp {
	rootPage: any = InitPage;

	constructor(platform: Platform) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
		});
	}
}
