import { Pipe } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Escape HTML content
 *
 * Usage:
 *	<div [innerHTML]="content | escape-html"></div>
 */
@Pipe({
  name: 'escape-html'
})
export class EscapeHtml {
  constructor(private sce: DomSanitizer) { }
  
  transform(data: string): any {
    return this.sce.bypassSecurityTrustHtml(data);
  }
}