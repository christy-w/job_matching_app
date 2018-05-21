import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Utils } from '../../providers/utils';
import { InitModel } from '../../models';

/**
 * Modal page for display latest versions returned from API
 */
@Component({
	selector: 'page-new-version',
	templateUrl: 'new-version.html'
})
export class NewVersionPage {
	
	init_model: InitModel = null;
	force_update: boolean = false;
	download_url: string;
	
	show_release_notes: boolean = false;
	show_release_notes_icon: string = 'arrow-dropdown-circle';
	
	constructor(
		private platform: Platform,
		private view: ViewController,
		private params: NavParams,
		private utils: Utils
	) {
		console.log('NewVersionPage > params', this.params.data);
		this.init_model = this.params.data.init_model;
		this.force_update = (this.init_model.force_update) ? !!this.init_model.force_update : false;
		
		// disable hardware back button when force upgrade
		console.log('NewVersionPage > force_update = ' + this.force_update);
		if (this.force_update) {
			this.platform.registerBackButtonAction(() => {});
		}
		
		// get App download URL from config
		if (this.utils.currentOS() == 'ios') {
			this.download_url = this.init_model.app_config.ios_app_url;
		} else if (this.utils.currentOS() == 'android') {
			this.download_url = this.init_model.app_config.android_app_url;
		}
	}
	
	// Toggle release notes
	onClickReleaseNotes() {
		this.show_release_notes = !this.show_release_notes;
		this.show_release_notes_icon = this.show_release_notes ? 'arrow-dropup-circle' : 'arrow-dropdown-circle';
	}
	
	// Dismiss this modal / popup
	onClickSkipBtn(data) {
		if (!this.force_update) {
			let key: string = 'VERSION_CHECK_FROM_' + this.init_model.curr_version + '_TO_' + this.init_model.latest_version;
			this.utils.setLocal(key, true).then(() => {
				console.log('Finish setting to key: ' + key);
				this.view.dismiss(data);
			});
		}
	}
}
