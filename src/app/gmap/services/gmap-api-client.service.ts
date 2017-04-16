import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

@Injectable()
export class GMapApiClientService {
  private defaultTravelMode: google.maps.TravelMode = google.maps.TravelMode.WALKING;
  private directionsService: google.maps.DirectionsService;

  constructor(private http: Http) {
    this.directionsService = new google.maps.DirectionsService();
  }

  public getRoute(origin: any,
                  destination: any,
                  travelMode: google.maps.TravelMode = this.defaultTravelMode,
                  waypoints: any[] = []): Promise<any> {

    const request: google.maps.DirectionsRequest = { origin, destination, travelMode, waypoints };

    return new Promise((resolve, reject) => {
      this.directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          resolve(response);
        } else {
          reject(status);
        }
      });
    });
  }
}
