import { Observable, of } from 'rxjs';
import tabs from 'src/assets/tabs.json';

import { Injectable } from '@angular/core';

import { TabElement } from '../shared/models/tab-item.interface';


@Injectable({
	providedIn: 'root'
})
export class TabManagerService {

	loadTabs(): Observable<TabElement[]> {
		return of(tabs);
	}
}
