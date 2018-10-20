import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Events } from 'ionic-angular';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers/api';

import moment from 'moment';

@Component({
	selector: 'menu-component',
	templateUrl: 'menu.html'
})
export class MenuComponent {

	@ViewChild('fs_nav') nav: Nav;
	
	// reference to store current page
	config: any;
	app_config: any;
	pages: any;
	menuPage: any = 'ApplicantHomePage';
	hotkeys: any;
	show_tab: boolean = true;
	isLiveMode: boolean = false;
	language: string;
	press_count: number = 0;

	constructor(
		protected menu: MenuController,
		protected api: Api,
		protected utils: Utils,
		protected events: Events
	) {
		this.language = this.utils.currentLang();
		this.config = Config;

		this.hotkeys = [
			{ tab: 'home', title: 'HOTKEY.HOME', component: 'ApplicantHomePage', icon: 'home', index: '' },
			{ tab: 'recommendation', title: 'HOTKEY.RECOMMENDATION', component: 'ApplicantRecommendationPage', icon: 'thumb', index: '' },
			{ tab: 'record', title: 'HOTKEY.RECORD', component: 'ApplicantRecordPage', icon: 'record', index: '' },
			{ tab: 'profile', title: 'HOTKEY.PROFILE', component: 'ApplicantProfilePage', icon: 'profile', index: '' },
		];
	}

	onClickHotKey(key) {
		if (Config.ACTIVE_TAB == key){
			return;
		}
		let option = { 
			animate: true,
			animation: 'md-transition',
			direction: 'forward'
		};
		this.nav.setRoot(key.component, { tab_index: key.index }, option);
		Config.ACTIVE_TAB = key;
	}
}