import {Component} from '@angular/core';
import {Platform, ViewController, NavController} from 'ionic-angular';

import {LocalData} from '../../core/providers/local-data';
import {BasePage} from '../../core/BasePage';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage extends BasePage {
	
    constructor(
        // dependencies required by parent
        protected platform: Platform,
        protected view: ViewController,
        protected nav: NavController,
        
        // additional dependencies
        private local: LocalData
    ) {
        super(platform, view, nav);
		console.log('HomePage constructor');
        
        // Sample: get value of key "test" from local storage
        local.get('test').then(function(value) {
            console.log('value = ' + value);
        })
    }
    
    onPageLoaded() {
        // TODO: download initial data
        console.log('HomePage onPageLoaded');
    }
}