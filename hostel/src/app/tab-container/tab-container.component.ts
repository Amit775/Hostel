import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TabElement } from '../shared/models/tab-item.interface';
import { State } from '../../../../narnia/src/app/shared/state.interface';
import { TabManagerService } from '../core/tab-manager.service';
import { StateService } from '../core/state.service';


@Component({
	selector: 'hst-tab-container',
	templateUrl: './tab-container.component.html',
	styleUrls: ['./tab-container.component.less']
})
export class TabContainerComponent {

	constructor(
		private tabManager: TabManagerService,
		private stateService: StateService
	) { }

	get tab$(): Observable<TabElement> {
		return this.tabManager.currentTab$;
	}

	get state$(): Observable<State> {
		return this.stateService.state$;
	}
}
