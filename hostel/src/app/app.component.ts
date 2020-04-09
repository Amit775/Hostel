import { Observable, BehaviorSubject } from 'rxjs';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { State, Permissions, EMPTY_STATE } from '../../../narnia/src/app/shared/state.interface';

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

	state = new BehaviorSubject<State>(EMPTY_STATE);
	get state$(): Observable<State> {
		return this.state.asObservable();
	}

	title = 'ערך כ שהו';

	constructor(
		private tabManager: TabManagerService
	) { }

	ngOnInit() {
		this.insertNarnia();
		this.tabs$ = this.tabManager.loadTabs();
	}

	changeTab(nextTab: MatTabChangeEvent) {
		this.tabManager.changeTab(nextTab.index);
	}

	insertNarnia(): void {
		const narnia = document.createElement('elm-narnia-root');
		document.querySelector('.mat-tab-header').after(narnia);
		narnia.addEventListener('stateChange', this.stateChange);
	}

	stateChange = (event: CustomEvent<State>): void => {
		this.state.next(event.detail);
	}

	get shouldShowContent(): boolean {
		return this.state.value.permissions !== Permissions.NONE;
	}

	get message(): string {
		if (!this.state.value.user) {
			return 'נא להזדהות';
		}

		if (!this.state.value.topic) {
			return 'נא לבחור נושא';
		}

		if (this.state.value.permissions === Permissions.NONE) {
			return 'חסרות הרשאות לצפייה בתוכן';
		}
	}

}
