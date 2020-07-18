import { Component, OnInit } from '@angular/core';
import { map, tileLayer, marker, icon, circle } from 'leaflet';

@Component({
	selector: 'app-root',
	template: ` <div id="map"></div> `,
	styles: [`#map { height: 100%; width: 100%; }`]
})
export class AppComponent implements OnInit {

	private instance: L.Map;
	ngOnInit(): void {
		this.instance = map('map').setView([51.505, -0.09], 12);
		tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: 'pk.eyJ1IjoiYW1pdDc3NSIsImEiOiJja2NxaWYyOXoxNTc2MnVsbTZucDN2MzMxIn0.i7qR8AAdH4HtpHtJIDdEbg'
		}).addTo(this.instance);

		marker([51.5, -0.09], {
			icon: icon({
				iconSize: [25, 41],
				iconAnchor: [13, 41],
				iconUrl: 'assets/leaflet/marker-icon.png',
				iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
				shadowUrl: 'assets/leaflet/marker-shadow.png'
			})
		}).addTo(this.instance);

		circle([51.508, -0.11], {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5,
			radius: 500
		}).addTo(this.instance);
	}
}
