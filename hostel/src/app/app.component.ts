import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { SharerService } from './core/sharer.service';
import { TabManagerService } from './core/tab-manager.service';
import { TabElement } from './shared/models/tab-item.interface';


@Component({
	selector: 'hst-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
	public tabs$: Observable<TabElement[]>;

	constructor(
		private tabManager: TabManagerService,
		private sharer: SharerService
	) { }

	ngOnInit() {

		this.tabs$ = this.tabManager.loadTabs();
	}


	inc() {
		this.sharer.inc();
	}

	get value() {
		return this.sharer.value;
	}
}
