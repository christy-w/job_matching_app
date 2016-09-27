import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Utils } from '../../core/providers/utils';
import { ApiService } from '../../providers/api-service/api-service';
import { AppVersion } from '../../models/app-version';

/**
 * Modal page for display latest versions returned from API
 */
@Component({
	templateUrl: 'build/pages/new-version/new-version.html',
})
export class NewVersionPage {

	public force_upgrade: boolean = false;
	public curr_version_code: string;
	public new_versions: AppVersion[] = [];
	public download_url: string;

	constructor(
		private platform: Platform,
		private view: ViewController,
		private params: NavParams,
		private api: ApiService,
		private utils: Utils
	) {
		this.force_upgrade = params.data.force_upgrade;
		this.curr_version_code = params.data.curr_version_code;
		this.new_versions = params.data.new_versions || [];
		
		// disable hardware back button when force upgrade
		console.log('NewVersionPage > force_upgrade = ' + this.force_upgrade);
		if (this.force_upgrade) {
			platform.registerBackButtonAction(() => {});
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
	
	dismiss(data) {
		if (!this.force_upgrade) {
			let key: string = 'VERSION_CHECK_FROM_' + this.curr_version_code;
			this.utils.setLocal(key, true).then(() => {
				console.log('Finish setting to key: ' + key);
				this.view.dismiss(data);
			});
		}
	}
}
