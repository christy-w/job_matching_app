// Reference: http://blog.ionic.io/ionic-and-lazy-loading-pt-2/

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonHeader } from './common-header/common-header';
import { CommonFooter } from './common-footer/common-footer';
import { CardSlider } from './card-slider/card-slider';
import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        CommonHeader,
        CommonFooter,
        CardSlider,
        TimelineComponent,
        TimelineItemComponent,
        TimelineTimeComponent
    ],
    imports: [
        IonicModule,
        TranslateModule.forChild()
    ],
    exports: [
        CommonHeader,
        CommonFooter,
        CardSlider,
        TimelineComponent,
        TimelineItemComponent,
        TimelineTimeComponent
    ]
})
export class ComponentsModule { }