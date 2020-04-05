import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from './main.service';

@Component({
	selector: 'elm-ice-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.less']
})
export class PanelComponent implements OnInit {
	constructor(private mainService: MainService) {}

	ngOnInit() {
		this.resetSelects();
	}
	get optionsa$(): Observable<Option[]> {
		return this.mainService.optionsa$;
	}
	get optionsb$(): Observable<Option[]> {
		return this.mainService.optionsb$;
	}

	resetSelects() {
		this.mainService.reset();
	}
}

export interface Option {
	value: string | number;
	display: string;
}
