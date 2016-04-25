import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
	templateUrl: 'build/pages/demo-detail/demo-detail.html'
})
export class DemoDetailPage {

	mItemID: string;
	
	constructor(private nav: NavController, private navParams: NavParams) {
		this.mItemID = this.navParams.get('id');
		console.log('mItemID = ' + this.mItemID);
	}
}