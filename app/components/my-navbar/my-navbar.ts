import { Component, Input } from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular';

@Component({
	selector: 'my-navbar',
	templateUrl: 'build/components/my-navbar/my-navbar.html',
	directives: [IONIC_DIRECTIVES]
})
export class MyNavbar {

	@Input() title: string;
	@Input() logo_url: string;

	constructor() {
	}
}
