import { Component, Input } from '@angular/core';

@Component({
	selector: 'my-navbar',
	templateUrl: 'my-navbar.html'
})
export class MyNavbar {

	@Input() title: string;
	@Input() logo_url: string;

	constructor() {
	}
}
