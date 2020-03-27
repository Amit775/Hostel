import { Component } from '@angular/core';

import { ToasterService } from '../../../../hostel/src/app/core/toaster.service';


export interface MenuItem {
	icon: string;
	label: string;
	action: () => void;
}

@Component({
	selector: 'elm-bullshit-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.less']
})
export class TopBarComponent {

	constructor(private toaster: ToasterService) { }
	title = 'בלבולי שכל';

	menu: MenuItem[] = [
		{
			icon: 'info',
			label: 'מידע',
			action: () => this.toaster.info('info', 'בלבולי שכל')
		},
		{
			icon: 'warning',
			label: 'אזהרה',
			action: () => this.toaster.warn('warning', 'בלבולי שכל')
		},
		{
			icon: 'error',
			label: 'שגיאה',
			action: () => this.toaster.error('error', 'בלבולי שכל')
		},
		{
			icon: 'check',
			label: 'הצלחה',
			action: () => this.toaster.success('success', 'בלבולי שכל')
		}
	];

}
