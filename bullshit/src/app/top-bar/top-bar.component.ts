import { Component } from '@angular/core';


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

	constructor() { }
	title = 'בלבולי שכל';

	menu: MenuItem[] = [
		{
			icon: 'info',
			label: 'מידע',
			action: () => console.log('info', 'בלבולי שכל')
		},
		{
			icon: 'warning',
			label: 'אזהרה',
			action: () => console.warn('warning', 'בלבולי שכל')
		},
		{
			icon: 'error',
			label: 'שגיאה',
			action: () => console.error('error', 'בלבולי שכל')
		},
		{
			icon: 'check',
			label: 'הצלחה',
			action: () => console.log('success', 'בלבולי שכל')
		}
	];

}
