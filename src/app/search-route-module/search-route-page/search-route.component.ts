import { Component, OnInit } from '@angular/core';

import { GMapApiClientService } from 'app/gmap/services/gmap-api-client.service';

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.scss']
})
export class SearchRouteComponent implements OnInit {

  private map: google.maps.Map;
  private directionsDisplay: google.maps.DirectionsRenderer;
  private defautOptions: { center, zoom } = {
    center: { lat: 49.8397, lng: 24.0297 },
    zoom: 14
  };
  public options: { center, zoom };
  public overlays: google.maps.Marker[];

  constructor(private gMapApiClientService: GMapApiClientService) {
    this.directionsDisplay = new google.maps.DirectionsRenderer();
  }

  ngOnInit() {
    this.options = Object.assign({}, this.defautOptions);
    this.initOverlays();
  }

  initOverlays(): void {
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

  setMap(event): void {
    this.map = event.map;
    this.directionsDisplay.setMap(event.map);
  }

  handleMapClick(event): void {
    this.addMarker(event.latLng);
  }

  addMarker(latLng): void {
    this.overlays.push(new google.maps.Marker({
      position: {
        lat: latLng.lat(),
        lng: latLng.lng()
      },
      draggable: false
    }));
  }

  public buildRoute(): void {
    this.gMapApiClientService.getRoute('Lviv', 'Sambir')
      .then((response: google.maps.DirectionsResult) => {
        this.directionsDisplay.setDirections(response);
      });
  }

  public zoomIn(map) {
    this.map.setZoom(this.map.getZoom() + 1);
  }

  public zoomOut(map) {
    this.map.setZoom(this.map.getZoom() - 1);
  }

  public clear() {
    this.overlays = [];
  }

  public reset() {
    this.map.setCenter(this.defautOptions.center);
    this.map.setZoom(this.defautOptions.zoom);
    this.initOverlays();
  }
}
