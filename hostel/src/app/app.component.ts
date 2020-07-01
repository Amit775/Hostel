import { Observable, BehaviorSubject } from 'rxjs';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { State, Permissions, EMPTY_STATE } from '../../../narnia/src/app/shared/state.interface';

import { TabManagerService } from './core/tab-manager.service';
import { TabElement } from './shared/models/tab-item.interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from './core/state.service';
import { map } from 'rxjs/operators';


@Component({
	selector: 'hst-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {


	get tabs(): TabElement[] {
		return this.tabManager.tabElements;
	}

	get state$(): Observable<State> {
		return this.stateService.state$;
	}

	get selectedTabIndex$(): Observable<number> {
		return this.tabManager.currentTab$.pipe(map((tab: TabElement) => tab?.index || 0));
	}

	constructor(
		private tabManager: TabManagerService,
		private stateService: StateService
	) { }

	ngOnInit() {
		this.insertNarnia();
		this.tabManager.initializeTabs();
	}

	insertNarnia(): void {
		const narnia = document.createElement('elm-narnia-root');
		document.querySelector('.mat-tab-header').after(narnia);
		narnia.addEventListener('stateChange', (event: CustomEvent<State>) => this.stateChange(event));
	}

	stateChange(event: CustomEvent<State>): void {
		this.stateService.updateState(event.detail);
	}

	get shouldShowContent(): boolean {
		return this.stateService.value.permissions !== Permissions.NONE;
	}

	get message(): string {
		const { user, topic, permissions } = this.stateService.value;

		if (!user) {
			return 'נא להזדהות';
		}

		if (!topic) {
			return 'נא לבחור נושא';
		}

		if (permissions === Permissions.NONE) {
			return 'חסרות הרשאות לצפייה בתוכן';
		}
	}

}
