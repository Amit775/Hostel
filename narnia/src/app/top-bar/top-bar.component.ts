import { Component, Input } from '@angular/core';

@Component({
	selector: 'elm-chg-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.less']
})
export class TopBarComponent {

	@Input() title: string;
}
