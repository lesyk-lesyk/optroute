import { OptimisationResult } from './../../tsp-opt/interfaces/optimisation-result';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MapPoint } from './../models/map-point';
import { GMapApiClientService } from 'app/gmap/services/gmap-api-client.service';
import { GMapCalculationsService } from 'app/gmap/services/gmap-calculations.service';
import { NotificationsService } from 'app/notifications/services/notifications.service';
import { Message } from 'primeng/components/common/api';
import { TspOptService } from 'app/tsp-opt/services/tsp-opt.service';

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
  public emptyMapPointsMessage = 'Empty Addresses list. Please, click on map to add point.';

  public originalRouteInfo: string;
  public optRouteInfo: string;
  
  constructor(
      private gMapApiClientService: GMapApiClientService,
      private notificationsService: NotificationsService,
      private gMapCalculationsService: GMapCalculationsService,
      private tspOptService: TspOptService) {
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
    const tempOverlays: google.maps.Marker[] = [];

    this.mapPoints.forEach(point => {
      tempOverlays.push(point.marker);
    });

    this.clearOverlays();
    this.overlays = tempOverlays;
  }

  public setMap(event): void {
    this.map = event.map;
    this.directionsDisplay.setMap(event.map);
  }

  public handleMapClick(event): void {
    this.gMapApiClientService.getAddress(event.latLng)
      .then(address => {
        this.addMapPoint(address, event.latLng);
      })
      .catch((error: Message) => {
        this.notificationsService.showNotificationPopup({
          severity: 'error',
          summary: error.summary,
          detail: error.detail
        });
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
    this.map.panTo(latLng);
  }

  public buildRoute(): void {
    const origin = this.mapPoints[0].marker.getPosition();
    const destination = origin;

    const waypoints: google.maps.DirectionsWaypoint[] = [];
    this.mapPoints.slice(1).forEach(point => {
      waypoints.push({ location: point.marker.getPosition(), stopover: true });
    });

    this.gMapApiClientService.getRoute(origin, destination, waypoints)
      .then((response: google.maps.DirectionsResult) => {
        this.notificationsService.showNotificationPopup({
          severity: 'success',
          summary: 'Build route',
          detail: 'Success!'
        });
        this.directionsDisplay.setDirections(response);
        const tmp = this.gMapCalculationsService.getRouteInfo(response.routes[0]);
        this.originalRouteInfo = `${tmp.length} ${tmp.duration}`;
        this.optRouteInfo = undefined;
        this.clearOverlays();
      })
      .catch((error: Message) => {
        this.notificationsService.showNotificationPopup({
          severity: 'error',
          summary: error.summary,
          detail: error.detail
        });
      });
  }

  public optimiseRoute() {
    console.log('Optimise Route');

    const locations = this.mapPoints.map(point => point.marker.getPosition());
    this.gMapApiClientService.getDistanceMatrix(locations)
      .then(matrix => {
        this.tspOptService.oprimizeRoute(matrix).then((result: OptimisationResult) => {
          console.log('optimise result', result);
          this.buildOptRoute(result.order);
        });
      })
      .catch((error: Message) => {
        this.notificationsService.showNotificationPopup({
          severity: 'error',
          summary: error.summary,
          detail: error.detail
        });
      });
  }

  /* TODO: should refactor buildOptRoute() and buildRoute() */
  public buildOptRoute(order): void {
    const origin = this.mapPoints[0].marker.getPosition();
    const destination = origin;

    const waypoints: google.maps.DirectionsWaypoint[] = [];

    for (let i = 1; i < this.mapPoints.length; i++) {
      waypoints.push({
        location: this.mapPoints[order[i]].marker.getPosition(),
        stopover: true
      });
    }

    this.gMapApiClientService.getRoute(origin, destination, waypoints)
      .then((response: google.maps.DirectionsResult) => {
        this.notificationsService.showNotificationPopup({
          severity: 'success',
          summary: 'Build opt route',
          detail: 'Success!'
        });
        this.directionsDisplay.setDirections(response);
        const tmp = this.gMapCalculationsService.getRouteInfo(response.routes[0]);
        this.optRouteInfo = `${tmp.length} ${tmp.duration}`;
        this.clearOverlays();
      })
      .catch((error: Message) => {
        this.notificationsService.showNotificationPopup({
          severity: 'error',
          summary: error.summary,
          detail: error.detail
        });
      });
  }

  public zoomIn(map) {
    this.map.setZoom(this.map.getZoom() + 1);
  }

  public zoomOut(map) {
    this.map.setZoom(this.map.getZoom() - 1);
  }

  public clear() {
    this.mapPoints = [];
    this.clearOverlays();
    this.clearDirections();
  }

  private clearOverlays() {
    this.overlays = [];
  }

  private clearDirections() {
    this.directionsDisplay.setDirections({ routes: [] });
  }

  private resetMapOptions() {
    this.map.setCenter(this.defautOptions.center);
    this.map.setZoom(this.defautOptions.zoom);
  }

  public reset() {
    this.resetMapOptions();
    this.clearDirections();
    this.initDefaultData();
    this.renderOverlays();
  }
}
