import { Component, ViewChild } from '@angular/core';
import { Platform, ViewController, NavController, Slides } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { MenuComponent } from '../../components/menu/menu';

@IonicPage()
@Component({
	selector: 'page-sign-up',
	templateUrl: 'sign-up.html'
})
export class SignUpPage extends BasePage {
	@ViewChild('signUpSlides') slides: Slides;

	name: string = 'SignUpPage';

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils
	) {
		super(platform, view, nav, utils);
    	Config.DEBUG_VERBOSE && console.log('SignUpPage constructor');
  }
  
  ngAfterViewInit() {
		if(this.slides)
		{
      // this.slides.lockSwipes(true);
			this.slides.slidesPerView = '1';
			this.slides.centeredSlides = true;
			this.slides.loop = false;
		}
  }
  
  openLoginPage() {
    this.nav.pop();
  }

  goNextSlide() {
		console.log('slide next');
    this.slides.slideNext();
	}
	
	goPrevSlide() {
		console.log('slide prev');
		this.slides.slidePrev();
	}

	confirmCode() {
		this.nav.setRoot(MenuComponent);
	}
}