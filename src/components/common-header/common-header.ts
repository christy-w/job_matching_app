import { Component, Input, ElementRef } from '@angular/core';

/**
 * Common header across pages
 *
 * Usage:
 *	<common-header [title]="'PAGE.HOME' | translate" [enable-menu]="true" [enable-back]="true"></common-header>
 */
@Component({
	selector: 'common-header',
	templateUrl: 'common-header.html'
})
export class CommonHeader {
	
	@Input() title: string;
	@Input('logo-url') logo_url: string;
	@Input('enable-menu') enable_menu: boolean = true;
	@Input('enable-back') enable_back: boolean = false;

	constructor(private el: ElementRef) {
	}

	// To remove unnecessary <common-header></common-header> tag
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
