import { Component, ViewChild, Input } from '@angular/core';
import { Slides, NavController } from 'ionic-angular';
import { Utils } from '../../core/providers/utils';

@Component({
	selector: 'card-slider',
	templateUrl: 'card-slider.html'
})
export class CardSlider {

	@ViewChild('cardSlider') slides: Slides;
	@Input() slidesInfo: any;

  	language: string;
	autoplay_millisecond: any = 2300;
  	speed_millisecond: any = 300;
  
	constructor(
		private utils: Utils,
		protected nav: NavController
	) {
		this.language = this.utils.currentLang();
	}

	ngAfterViewInit() {
		console.log('this.slidesInfo', this.slidesInfo);
		if(this.slides)
		{
			this.slides.slidesPerView = '1.2';
			this.slides.centeredSlides = true;
			this.slides.spaceBetween = '10';
			this.slides.speed = parseInt(this.speed_millisecond);
			this.slides.loop = false;
		}
	}

	flip(slide) {
		slide.flipped = !slide.flipped;
	}
}
