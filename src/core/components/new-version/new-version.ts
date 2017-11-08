import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Utils } from '../../providers/utils';
import { Api } from '../../../providers';
import { GetVersionResponse } from '../../models/new-version';

/**
 * Modal page for display latest versions returned from API
 */
@Component({
	selector: 'page-new-version',
	templateUrl: 'new-version.html'
})
export class NewVersionPage {
	
	version_response: GetVersionResponse = null;
	force_upgrade: boolean = false;
	download_url: string;
	
	show_release_notes: boolean = false;
	show_release_notes_icon: string = 'arrow-dropdown-circle';
	
	constructor(
		private platform: Platform,
		private view: ViewController,
		private params: NavParams,
		private api: Api,
		private utils: Utils
	) {
		console.log('NewVersionPage > params', this.params.data);
		this.version_response = this.params.data.version_response;
		this.force_upgrade = (this.version_response.force_upgrade) ? !!this.version_response.force_upgrade : false;
		
		// disable hardware back button when force upgrade
		console.log('NewVersionPage > force_upgrade = ' + this.force_upgrade);
		if (this.force_upgrade) {
			this.platform.registerBackButtonAction(() => {});
		}
		
		// get App download URL from API
		this.api.getAppConfig().then(data => {
			if (this.utils.currentOS() == 'ios') {
				this.download_url = data['ios_url'];
			} else if (this.utils.currentOS() == 'android') {
				this.download_url = data['android_url'];
			}
		});
	}
	
	// Toggle release notes
	onClickReleaseNotes() {
		this.show_release_notes = !this.show_release_notes;
		this.show_release_notes_icon = this.show_release_notes ? 'arrow-dropup-circle' : 'arrow-dropdown-circle';
	}
	
	// Dismiss this modal / popup
	onClickSkipBtn(data) {
		if (!this.force_upgrade) {
			let key: string = 'VERSION_CHECK_FROM_' + this.version_response.curr_version + '_TO_' + this.version_response.latest_version;
			this.utils.setLocal(key, true).then(() => {
				console.log('Finish setting to key: ' + key);
				this.view.dismiss(data);
			});
		}
	}
}
