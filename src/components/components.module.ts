// Reference: http://blog.ionic.io/ionic-and-lazy-loading-pt-2/

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonHeader } from './common-header/common-header';
import { CommonFooter } from './common-footer/common-footer';

@NgModule({
    declarations: [
        CommonHeader,
        CommonFooter
    ],
    imports: [
        IonicModule
    ],
    exports: [
        CommonHeader,
        CommonFooter
    ]
})
export class ComponentsModule { }