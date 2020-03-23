import { Observable } from 'rxjs';

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { TabManagerService } from './core/tab-manager.service';
import { ToasterService } from './core/toaster.service';
import { TabElement } from './shared/models/tab-item.interface';


@Component({
	selector: 'hst-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
	public tabs$: Observable<TabElement[]>;

	@ViewChild('host', { read: ViewContainerRef })
	host: ViewContainerRef;

	constructor(
		private tabManager: TabManagerService,
		private toaster: ToasterService
	) { }

	ngOnInit() {
		this.tabs$ = this.tabManager.loadTabs();
	}
}
