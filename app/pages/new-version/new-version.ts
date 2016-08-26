import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

/**
 * Modal page for display latest versions returned from API
 */
@Component({
  templateUrl: 'build/pages/new-version/new-version.html',
})
export class NewVersionPage {

	public curr_version: string;
	public new_versions: Version[];
	public force_upgrade: boolean = false;

	constructor(
		public navParams: NavParams,
		public viewCtrl: ViewController
	) {
		this.curr_version = navParams.data.curr_version;
		this.new_versions = navParams.data.new_versions;

		// check whether force upgrade or not		
		this.new_versions.forEach(version => {
			if (version.force_upgrade) {
				this.force_upgrade = true;
			}	
		})
	}

	dismiss(data) {
		if (!this.force_upgrade) {
			// using the injected ViewController this page
			// can "dismiss" itself and pass back data
			this.viewCtrl.dismiss(data);
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