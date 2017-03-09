import { Injectable, Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
/*
  Generated class for the CustomSafe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'custom-safe'
})
@Injectable()
export class CustomSafe {
    constructor(private sce: DomSanitizer) {}

    transform(data: string): any {
        return this.sce.bypassSecurityTrustHtml(data);
    }
}