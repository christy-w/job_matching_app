import {Page, NavController} from 'ionic-angular';
import {DemoDetailPage} from '../demo-detail/demo-detail';

/**
 * Demonstrating Virtual Scroll for list items
 * Reference: http://www.joshmorony.com/boosting-scroll-performance-in-ionic-2/
 */

@Page({
	templateUrl: 'build/pages/demo-list/demo-list.html'
})
export class DemoListPage {
	
	// enable navPush to these pages
	mDemoDetailPage = DemoDetailPage;

	// item list
	mItems: Object[];
	
	constructor(private nav: NavController) {
		
		this.mItems = [];
		
		for (let i = 0; i < 2000; i++) {
			let item = {
				id: i+1,
				title: 'Title',
				body: 'body',
				avatarUrl: 'https://avatars.io/facebook/random'+i
			};
			
			this.mItems.push(item);
		}
    }
}