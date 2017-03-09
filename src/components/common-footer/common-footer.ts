import { Component, Input, ElementRef } from '@angular/core';

/**
 * Common footer across pages 
 *
 * Usage:
 *	<common-footer [title]="'My Footer'"></common-footer>
 */
@Component({
	selector: 'common-footer',
	templateUrl: 'common-footer.html'
})
export class CommonFooter {
	
	@Input() title: string;
	
	constructor(private el: ElementRef) {
	}
	
	// To remove unnecessary <common-footer></common-footer> tag
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