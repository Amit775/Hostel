import { Component, Input } from '@angular/core';

import { State } from '../../../narnia/src/app/shared/state.interface';

@Component({
	selector: 'elm-moana-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	@Input() state: State;

	title = 'moana';
}
