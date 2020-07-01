import { Component } from '@angular/core';


export interface Link {
	tooltip: string;
	icon: string;
	route: string;
}

@Component({
	selector: 'elm-moana-nav-list',
	templateUrl: './nav-list.component.html',
	styleUrls: ['./nav-list.component.less']
})
export class NavListComponent {

	links: Link[] = [
		{
			tooltip: 'ראשי',
			icon: 'home',
			route: 'home'
		},
		{
			tooltip: 'רשת',
			icon: 'view_quilt',
			route: 'grid'
		},
		{
			tooltip: 'טבלה',
			icon: 'table_chart',
			route: 'table'
		},
		{
			tooltip: 'אקורדיון',
			icon: 'double_arrow',
			route: 'accordion'
		}
	];
}
