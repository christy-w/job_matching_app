import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { SearchFilter } from '../../components/search-filter/search-filter';

@IonicPage()
@Component({
	selector: 'page-applicant-home',
	templateUrl: 'applicant-home.html'
})
export class ApplicantHomePage extends BasePage {

	name: string = 'ApplicantHomePage';
	jobsQueued: string = 'allJobs';
	
	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('HomePage constructor');
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = 'home';
	}

	openSearchFilter() {
		let searchFilter = this.utils.createPopover(SearchFilter, {}, {cssClass:'search-filter'});
		searchFilter.onDidDismiss(data => {
			// (data) ? this.saveFilter(data) : this.cancelFilter();
			// this.filterShown = false;
		});
	    searchFilter.present();
	}
}