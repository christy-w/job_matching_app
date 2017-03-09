import { Directive, ElementRef } from '@angular/core';
import { Utils } from '../../providers/utils';

/**
 * Enable hyperlinks to open from in-app browser
 *
 * Usage:
 *	<div inapp-href [innerHTML]="content | escape-html"></div>
 */
@Directive({
  selector: '[inapp-href]'
})
export class InappHref {

  private el: HTMLElement;

  constructor(el: ElementRef, private utils: Utils) {
    this.el = el.nativeElement;
  }
  
  ngAfterViewInit() {
    var self = this;
    this.el.addEventListener('click', function (event) {
      var targetNode = event.target;
      var element = event.currentTarget;
      while (targetNode && targetNode !== element) {
        if (targetNode['tagName'] === 'A') {
          event.preventDefault();
          event.stopImmediatePropagation();
          var href = targetNode['href'];
          self.utils.showBrowser(href, '_blank');
          return false;
        }
        targetNode = targetNode['parentNode'];
      }
      return true;
    });
  }
}