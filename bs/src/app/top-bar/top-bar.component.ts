import { Component, OnInit } from '@angular/core';


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
export class TopBarComponent implements OnInit {

	title = 'בלבולי שכל';

	menu: MenuItem[] = [
		{
			icon: 'info',
			label: 'מידע',
			action: () => console.log('info')
		},
		{
			icon: 'warning',
			label: 'אזהרה',
			action: () => console.log('warning')
		},
		{
			icon: 'error',
			label: 'שגיאה',
			action: () => console.log('error')
		},
		{
			icon: 'check',
			label: 'הצלחה',
			action: () => console.log('success')
		}
	];

	constructor() { }



	ngOnInit(): void {
	}



}
