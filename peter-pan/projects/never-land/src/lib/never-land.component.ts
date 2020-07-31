import { Component, OnInit } from '@angular/core';
import { NeverLandService } from './never-land.service';

@Component({
	selector: 'lib-never-land',
	template: `<div id="map"></div>`,
	styles: [
	]
})
export class NeverLandComponent implements OnInit {

	constructor(private service: NeverLandService) { }

	ngOnInit(): void {
		this.service.createMap('map');
	}

}
