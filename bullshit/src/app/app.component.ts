import { Component } from '@angular/core';

import { SharerService } from '../../../hostel/src/app/core/sharer.service';


@Component({
	selector: 'elm-bullshit-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {

	constructor(private sharer: SharerService) { }

	get value() {
		return this.sharer.value;
	}

	inc() {
		this.sharer.inc();
	}
}
