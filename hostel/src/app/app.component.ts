import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { TabManagerService } from './core/tab-manager.service';
import { TabElement } from './shared/models/tab-item.interface';
import { MatTabChangeEvent } from '@angular/material/tabs';


@Component({
	selector: 'hst-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
	public tabs$: Observable<TabElement[]>;

	title = 'ערך כ שהו';

	constructor(
		private tabManager: TabManagerService
	) { }

	ngOnInit() {
		this.tabs$ = this.tabManager.loadTabs();

		setTimeout(() => this.title = 'ערך מתוזמן', 3000);
	}

	out(event: CustomEvent<{ title: string }>) {
		console.log('emitter from element');
		console.log(event.detail);
	}

	change() {
		this.title = 'ערך אחר';
	}

	changeTab(nextTab: MatTabChangeEvent) {
		this.tabManager.changeTab(nextTab.index);
	}

}
