import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import tabs from 'src/assets/tabs.json';
import { TabElement } from '../shared/models/tab-item.interface';
import { IconsService } from './icons.service';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';


@Injectable({
	providedIn: 'root'
})
export class TabManagerService {

	tabElements: TabElement[] = [];
	currentTab = new BehaviorSubject<TabElement>(undefined);
	get currentTab$(): Observable<TabElement> {
		return this.currentTab.asObservable();
	}

	constructor(
		private icons: IconsService,
		private router: Router
	) { }

	initializeTabs(): void {
		// tslint:disable-next-line: arrow-return-shorthand
		this.tabElements = tabs.map((tab, index) => { return { ...tab, index } as TabElement; });
		this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
			const nextTab = this.getTabByRoute(event.urlAfterRedirects);
			if (nextTab == null) { this.router.navigate([this.tabElements[0].route]); }
			this.currentTab.next(nextTab);
		});

		this.icons.registerIcons(this.tabElements.map(x => x.icon));
	}

	private getTabByRoute(route: string): TabElement {
		route = route.split('/')[1] || route;
		return this.tabElements.find(tab => tab.route === route);
	}
}
