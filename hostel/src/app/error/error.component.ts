import { Component, OnInit } from '@angular/core';

import { ToasterService } from '../core/toaster.service';
import { TabManagerService } from '../core/tab-manager.service';


@Component({
	selector: 'hst-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {

	constructor(
		private toaster: ToasterService,
		private tabManager: TabManagerService
	) { }

	ngOnInit() {
		// const selectedTabName = this.tabManager.currentTab?.display || '';
		const selectedTabName = '';
		const message = `שגיאה בטעינת הטאב ${selectedTabName}`;
		this.toaster.error(message, 'הוסטל');
	}

}
