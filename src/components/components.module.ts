// Reference: http://blog.ionic.io/ionic-and-lazy-loading-pt-2/

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonHeader } from './common-header/common-header';
import { CommonFooter } from './common-footer/common-footer';
import { CardSlider } from './card-slider/card-slider';

@NgModule({
    declarations: [
        CommonHeader,
        CommonFooter,
        CardSlider
    ],
    imports: [
        IonicModule
    ],
    exports: [
        CommonHeader,
        CommonFooter,
        CardSlider
    ]
})
export class ComponentsModule { }