import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import tabs from 'src/assets/tabs.json';
import { TabElement } from '../shared/models/tab-item.interface';
import { IconsService } from './icons.service';


@Injectable({
	providedIn: 'root'
})
export class TabManagerService {

	private selectedTab: TabElement;
	get currentTab() {
		return this.selectedTab;
	}

	constructor(private icons: IconsService) { }
	loadTabs(): Observable<TabElement[]> {
		this.icons.registerIcons(tabs.map(x => x.icon));
		return of(tabs);
	}

	changeTab(index: number) {
		this.selectedTab = tabs[index];
	}
}
