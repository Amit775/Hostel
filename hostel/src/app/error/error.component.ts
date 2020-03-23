import { Component, OnInit } from '@angular/core';

import { ToasterService } from '../core/toaster.service';


@Component({
	selector: 'hst-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {

	constructor(private toaster: ToasterService) { }
	ngOnInit() {
		this.toaster.error('שגיאה בטעינת הטאב', 'אפליקציה');
	}

}
