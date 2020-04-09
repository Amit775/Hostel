import { Component, Input } from '@angular/core';
import { State } from '../../../narnia/src/app/shared/state.interface';

@Component({
	selector: 'elm-lion-king-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	@Input() state: State;
}
