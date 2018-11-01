import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';

@IonicPage()
@Component({
	selector: 'page-applicant-review',
	templateUrl: 'applicant-review.html'
})
export class ApplicantReviewPage extends BasePage {

	name: string = 'ApplicantReviewPage';
	reviews: any = [];
	review_count: number = 0;

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils
	) {
		super(platform, view, nav, utils);
    	Config.DEBUG_VERBOSE && console.log('ApplicantReviewPage constructor');
    
		this.reviews = [
			{
				name: '黃小明',
				publish_date: '2018-09-01',
				rating: 4,
				feedback: '員工做事盡責，態度友善有禮，會考慮再次僱用。'
			},
			{
				name: '黃小明',
				publish_date: '2018-08-23',
				rating: 3,
				feedback: '員工做事盡責，態度友善有禮，會考慮再次僱用。員工做事盡責，態度友善有禮，會考慮再次僱用。員工做事盡責，態度友善有禮，會考慮再次僱用。員工做事盡責，態度友善有禮，會考慮再次僱用。員工做事盡責，態度友善有禮，會考慮再次僱用。員工做事盡責，態度友善有禮，會考慮再次僱用。員工做事盡責，態度友善有禮，會考慮再次僱用。員工做事盡責，態度友善有禮，會考慮再次僱用。員工做事盡責，態度友善有禮，會考慮再次僱用。'
			},
			{
				name: '黃小明',
				publish_date: '2018-07-01',
				rating: 4,
				feedback: '員工做事盡責，態度友善有禮，會考慮再次僱用。'
			}
		];

		this.review_count = this.reviews.length;
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = '';
	}
}