import { Component } from '@angular/core';
import { Platform, ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';

@IonicPage()
@Component({
	selector: 'page-tnc',
	templateUrl: 'tnc.html'
})
export class TncPage extends BasePage {

	name: string = 'TncPage';
	about: any;

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api,
		private params: NavParams
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('TncPage constructor');

		this.initAbout();
	}
	initAbout() {
		this.api.startQueue([
		  this.api.getAbout()
		]).then(response => {
		  this.about = response[0];
		})
	}
}