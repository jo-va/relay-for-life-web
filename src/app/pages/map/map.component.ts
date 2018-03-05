import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as L from 'leaflet';

import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-map',
	template: `
		<div id="map" class="image map"></div>
	`,
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	@ViewChild('map') mapContainer: ElementRef;
	map: any;

	ngOnInit() {
		this.loadMap();
	}

	private loadMap() {
		this.map = L.map('map').fitWorld();
		// 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			// tslint:disable-next-line:max-line-length
			attribution: 'Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox.streets',
			accessToken: environment.mapboxAccessToken
		}).addTo(this.map);

		this.map.locate({
			setView: true,
			maxZoom: 16
		}).on('locationfound', (e) => {
			console.log(e);

			L.circle([e.latitude, e.longitude], {
				stroke: false,
				fillColor: 'red',
				fillOpacity: 0.5,
				radius: e.accuracy * 0.5
			}).addTo(this.map);

		}).on('locationerror', (err) => {
			console.log('location error: ', err.message);
		});
	}
}
