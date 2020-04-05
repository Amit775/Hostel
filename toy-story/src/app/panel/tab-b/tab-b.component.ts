import { Component, InjectionToken, Inject } from '@angular/core';

export const SOME_STRING = new InjectionToken('some string');

@Component({
	selector: 'elm-ice-tab-b',
	templateUrl: './tab-b.component.html',
	styleUrls: ['./tab-b.component.less']
})
export class TabBComponent {
	constructor(
		@Inject(SOME_STRING) public data: string
	) { }

	title = 'second tab';
}
