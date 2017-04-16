/// <reference path='../../../../node_modules/@types/google-maps/index.d.ts' />
import { Component, OnInit } from '@angular/core';

import { GMapApiClientService } from 'app/gmap/services/gmap-api-client.service';

@Component({
  selector: 'app-g-map',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {

  options: any;

  overlays: google.maps.Marker[];

  map: google.maps.Map;

  constructor(private gMapApiClientService: GMapApiClientService) { }

  ngOnInit() {
    this.options = {
      center: { lat: 49.8397, lng: 24.0297 },
      zoom: 14
    };

    this.initOverlays();
  }

  initOverlays() {
    if (!this.overlays || !this.overlays.length) {
      this.overlays = [
        new google.maps.Marker({ position: { lat: 49.840611, lng: 24.022510 } }),
        new google.maps.Marker({ position: { lat: 49.844065, lng: 24.026242 } }),
        new google.maps.Marker({ position: { lat: 49.837548, lng: 24.030172 } }),
        new google.maps.Marker({ position: { lat: 49.842089, lng: 24.016398 } }),
        new google.maps.Marker({ position: { lat: 49.836553, lng: 24.004382 } })
      ];
    }
  }

  setMap(event) {
    this.map = event.map;
  }

  handleMapClick(event) {
    this.addMarker(event.latLng);
  }

  addMarker(latLng) {
    console.log(this.overlays);

    this.overlays.push(new google.maps.Marker({
      position: {
        lat: latLng.lat(),
        lng: latLng.lng()
      },
      draggable: false
    }));
  }

  buildRoute() {
    console.log('buildRoute');
    this.gMapApiClientService.getRoute(this.overlays[0].getPosition(), this.overlays[1].getPosition());
  }

}
