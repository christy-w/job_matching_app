/**
 * Base class for all pages, with common functions and member variables for quick access
 * @Component and templates to be defined in child classes
 **/
import { Platform, ViewController, NavController, NavOptions, Content } from 'ionic-angular';
import { Config } from '../config';
import { Utils } from './providers/utils';

export class BasePage {

	// member variables accessible from child classes
	name: string;
	content: Content;
	language: string = Config.DEFAULT_LANGUAGE;

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils
	) {
		Config.DEBUG_VERBOSE && console.log('BasePage constructor');
		this.language = this.utils.currentLang();
	}
	
	// Back to previous page, or to root page
	goBack(toRoot: boolean = false, opts: NavOptions = {}) {
		(toRoot) ? this.nav.popToRoot(opts) : this.nav.pop(opts);
	}

	// Nav events: http://ionicframework.com/docs/v2/api/navigation/NavController/
	ionViewDidLoad() {
		this.content = this.view.getContent();
	}
	ionViewWillEnter() {
	}
	ionViewDidEnter() {
		// Google Analytics track view
		if (this.name) {
			this.utils.trackView(this.name);
		}
	}
	ionViewWillLeave() {
	}
	ionViewDidLeave() {
	}
	ionViewWillUnload() {
	}
}