import { Component, Input, ElementRef } from '@angular/core';

/**
 * Common navbar across pages 
 *
 * Usage:
 *	<my-navbar [title]="'PAGE.HOME' | translate" [enable-menu]="true" [enable-back]="true"></my-navbar>
 */
@Component({
	selector: 'my-navbar',
	templateUrl: 'my-navbar.html'
})
export class MyNavbar {

	@Input() title: string;
	@Input('logo-url') logo_url: string;
	@Input('enable-menu') enable_menu: boolean = false;
	@Input('enable-back') enable_back: boolean = false;

	constructor(private el: ElementRef) {
	}

	// To remove unnecessary <my-navbar></my-navbar> tag
	// Reference: http://stackoverflow.com/questions/34280475/remove-the-host-html-element-selectors-created-by-angular-component
	ngOnInit() {
		var nativeElement: HTMLElement = this.el.nativeElement,
			parentElement: HTMLElement = nativeElement.parentElement;
		// move all children out of the element
		while (nativeElement.firstChild) {
			parentElement.insertBefore(nativeElement.firstChild, nativeElement);
		}
		// remove the empty element(the host)
		parentElement.removeChild(nativeElement);
	}
}
