import { Component, ViewChild, Input } from '@angular/core';
import { Slides, NavController } from 'ionic-angular';
import { Utils } from '../../core/providers/utils';
import _ from 'lodash';

@Component({
	selector: 'card-slider',
	templateUrl: 'card-slider.html'
})
export class CardSlider {

	@ViewChild('cardSlider') slides: Slides;
	@Input() slidesInfo: any;

  	language: string;

	constructor(
		private utils: Utils,
		protected nav: NavController
	) {
		this.language = this.utils.currentLang();
		console.log('this.slidesInfo', this.slidesInfo);
	}

	ionViewAfterInit() {
		if(this.slides)
		{
			this.slides.slidesPerView = 'auto';
			this.slides.centeredSlides = true;
			this.slides.spaceBetween = 10;
		}
	}

	flip(slide) {
		slide.flipped = !slide.flipped;
	}
}
