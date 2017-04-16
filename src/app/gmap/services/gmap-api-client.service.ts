import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

@Injectable()
export class GMapApiClientService {
  private defaultTravelMode = 'WALKING';
  private directionsService;

  constructor(private http: Http) {
    this.directionsService = new google.maps.DirectionsService();
    console.log(this.directionsService);
  }

  public getRoute(origin: any, destination: any, travelMode: string = this.defaultTravelMode, waypoints: any[] = []) {
    console.log('getRoute');
  }
}
