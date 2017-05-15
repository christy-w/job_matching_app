// Reference: http://blog.ionic.io/ionic-and-lazy-loading-pt-2/

import { NgModule } from '@angular/core';
import { CommonHeader } from './common-header/common-header';
import { CommonFooter } from './common-footer/common-footer';
import { IonicModule } from 'ionic-angular';

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