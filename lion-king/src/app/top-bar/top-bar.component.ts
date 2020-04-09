import { Component } from '@angular/core';
import { ToasterService } from '../core/toaster.service';


export interface MenuItem {
	icon: string;
	label: string;
	action: () => void;
}

@Component({
	selector: 'elm-lion-king-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.less']
})
export class TopBarComponent {

	constructor(private toaster: ToasterService) { }
	title = 'מלך האריות';

	menu: MenuItem[] = [
		{
			icon: 'info',
			label: 'מידע',
			action: () => this.toaster.info('info', this.title)
		},
		{
			icon: 'warning',
			label: 'אזהרה',
			action: () => this.toaster.warn('warning', this.title)
		},
		{
			icon: 'error',
			label: 'שגיאה',
			action: () => this.toaster.error('error', this.title)
		},
		{
			icon: 'check',
			label: 'הצלחה',
			action: () => this.toaster.success('success', this.title)
		}
	];

}
