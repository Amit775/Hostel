import { Injectable } from '@angular/core';
import { MapInstance } from './leaflet.type';

@Injectable({
	providedIn: 'root'
})
export class NeverLandService {

	public createMap(element: string | HTMLElement): MapInstance {
		return new MapInstance(element).setView([31, 35], 12);
	}
}
