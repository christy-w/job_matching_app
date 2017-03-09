import {Directive, ElementRef, Input} from '@angular/core';
import { Utils } from '../../core/providers/utils';


/*
  Generated class for the CustomHref directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[custom-href]' // Attribute selector
})
export class CustomHref {

    private el: HTMLElement;
    
    constructor(el: ElementRef, private utils: Utils) {
        this.el = el.nativeElement;
    }

    ngAfterViewInit() {
      var self = this;
      this.el.addEventListener('click', function(event){
          var targetNode = event.target;
          var element = event.currentTarget;
          console.log('event', event)
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