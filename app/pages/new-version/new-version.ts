import {Component} from '@angular/core';
import {Platform, NavParams, ViewController} from 'ionic-angular';

/**
 * Modal page for display latest versions returned from API
 */
@Component({
	templateUrl: 'build/pages/new-version/new-version.html',
})
export class NewVersionPage {

	public curr_version_code: string;
	public new_versions: Version[];
	public force_upgrade: boolean = false;
	public download_url: string = '';

	constructor(
		public platform: Platform,
		public view: ViewController,
		public params: NavParams
	) {
		this.curr_version_code = params.data.curr_version_code;
		this.new_versions = params.data.new_versions;

		// check whether force upgrade or not		
		this.new_versions.forEach(version => {
			if (version.force_upgrade) {
				this.force_upgrade = true;
			}	
		})

		// disable hardware back button		
		if (this.force_upgrade) {
			platform.registerBackButtonAction(() => {});
		}
	}

	dismiss(data) {
		if (!this.force_upgrade) {
			// using the injected ViewController this page
			// can "dismiss" itself and pass back data
			this.view.dismiss(data);
		}
	}
}

// struct for app version object
class Version {
	id: number;
	code: string;
	release_notes: string;
	publish_date: string;
	force_upgrade: boolean;
}