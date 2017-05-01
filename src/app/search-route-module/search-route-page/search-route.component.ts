import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MapPoint } from './../models/map-point';
import { GMapApiClientService } from 'app/gmap/services/gmap-api-client.service';

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchRouteComponent implements OnInit {

  private map: google.maps.Map;
  private directionsDisplay: google.maps.DirectionsRenderer;
  private defautOptions: { center, zoom } = {
    center: { lat: 49.8397, lng: 24.0297 },
    zoom: 14
  };
  public options: { center, zoom };
  public overlays: google.maps.Marker[] = [];

  private defaultMapPoints: MapPoint[] = [
    new MapPoint(`Universytetska St, 1, L'viv Lviv Oblast, Ukraine`,
      new google.maps.Marker({ position: { lat: 49.840611, lng: 24.022510 } })),
    new MapPoint(`Svobody Ave, 28, L'viv, Lviv Oblast, Ukraine`,
      new google.maps.Marker({ position: { lat: 49.844065, lng: 24.026242 } })),
    new MapPoint(`Chaikovs'koho Street, 7, L'viv, Lviv Oblast, Ukraine`,
      new google.maps.Marker({ position: { lat: 49.837548, lng: 24.030172 } })),
    new MapPoint(`Horodotska St, 36, L'viv, Lviv Oblast, Ukraine`,
      new google.maps.Marker({ position: { lat: 49.842089, lng: 24.016398 } })),
    new MapPoint(`Kropyvnyts'koho Square, 1 L'viv, Lviv Oblast, Ukraine`,
      new google.maps.Marker({ position: { lat: 49.836553, lng: 24.004382 } }))
  ];
  public mapPoints: MapPoint[] = [];
  public emptyMapPointsMessage: string = 'Empty Addresses list. Please, click on map to add point.';

  constructor(private gMapApiClientService: GMapApiClientService) {
    this.directionsDisplay = new google.maps.DirectionsRenderer();
  }

  ngOnInit() {
    this.initDefaultOptions();
    this.initDefaultData();
    this.renderOverlays();
  }

  private initDefaultData(): void {
    this.mapPoints = this.defaultMapPoints.slice();
  }

  private initDefaultOptions(): void {
    this.options = Object.assign({}, this.defautOptions);
  }

  private renderOverlays(): void {
    this.overlays = [];
    this.mapPoints.forEach(point => {
      this.overlays.push(point.marker);
    });
  }

  public setMap(event): void {
    this.map = event.map;
    this.directionsDisplay.setMap(event.map);
  }

  public handleMapClick(event): void {
    this.gMapApiClientService.getAddress(event.latLng).then(address => {
      this.addMapPoint(address, event.latLng);
    });
  }

  private addMapPoint(address, latLng): void {
    this.mapPoints.push(new MapPoint(
      address, new google.maps.Marker({
        position: {
          lat: latLng.lat(),
          lng: latLng.lng()
        },
        draggable: false
      })
    ));

    this.renderOverlays();
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
    this.mapPoints = [];
  }

  public reset() {
    this.map.setCenter(this.defautOptions.center);
    this.map.setZoom(this.defautOptions.zoom);
    this.initDefaultData();
    this.renderOverlays();
  }
}
