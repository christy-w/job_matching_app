import {Page, NavController} from 'ionic-angular';

/**
 * Demonstrating Virtual Scroll for list items
 * Reference: http://www.joshmorony.com/boosting-scroll-performance-in-ionic-2/
 */

@Page({
  templateUrl: 'build/pages/demo-list/demo-list.html'
})
export class DemoListPage {

	private items: Object[];
	
	constructor(private nav: NavController) {

		this.items = [];

		for (let i = 0; i < 2000; i++) {
			let item = {
				title: 'Title',
				body: 'body',
				avatarUrl: 'https://avatars.io/facebook/random'+i
			};

			this.items.push(item);
		}
    }
}