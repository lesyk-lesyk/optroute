import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

@Injectable()
export class GMapApiClientService {
  private defaultTravelMode: google.maps.TravelMode = google.maps.TravelMode.WALKING;
  private directionsService: google.maps.DirectionsService;
  private geocoder: google.maps.Geocoder;

  constructor() {
    this.directionsService = new google.maps.DirectionsService();
    this.geocoder = new google.maps.Geocoder();
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

  public getAddress(latlng: google.maps.LatLng): Promise<string> {
    return new Promise((resolve, reject)=>{
      this.geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject('No results found')
          }
        } else {
          reject('Geocoder failed due to: ' + status);
        }
      });
    });
  }
}
