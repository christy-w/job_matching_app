import { Component, Input } from '@angular/core';

@Component({
	selector: 'timeline',
	templateUrl: 'timeline.html'
})
export class TimelineComponent {

	constructor() {
	}
}

@Component({
	selector: 'timeline-item',
	template: '<ng-content></ng-content>'
})
export class TimelineItemComponent {

	constructor() {
	}
}

@Component({
	selector: 'timeline-time',
	template: '<span>{{time.start_year}}<br>-<br>{{time.end_year}}</span>'
})
export class TimelineTimeComponent {
	@Input('time') time = {};

	constructor() {
	}
}
