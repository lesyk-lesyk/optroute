import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

@Injectable()
export class GMapApiClientService {
  private defaultTravelMode: google.maps.TravelMode = google.maps.TravelMode.WALKING;
  private directionsService: google.maps.DirectionsService;
  private geocoder: google.maps.Geocoder;
  private distanceMatrixService: google.maps.DistanceMatrixService;

  constructor() {
    this.directionsService = new google.maps.DirectionsService();
    this.geocoder = new google.maps.Geocoder();
    this.distanceMatrixService = new google.maps.DistanceMatrixService();
  }

  public getRoute(
      origin: google.maps.LatLng,
      destination: google.maps.LatLng,
      waypoints: google.maps.DirectionsWaypoint[] = [],
      travelMode: google.maps.TravelMode = this.defaultTravelMode): Promise<any> {

    const request: google.maps.DirectionsRequest = { origin, destination, travelMode, waypoints };

    return new Promise((resolve, reject) => {
      this.directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          resolve(response);
        } else {
          reject({ summary: 'Directions Service failed', detail: status });
        }
      });
    });
  }

  public getAddress(latlng: google.maps.LatLng): Promise<string> {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject({ summary: 'Geocoder failed', detail: 'No results found' });
          }
        } else {
          reject({ summary: 'Geocoder failed', detail: status });
        }
      });
    });
  }

  // TODO: move creation matrix to separate method!
  // TODO: add ability to get matrix for more than 10 locations!
  public getDistanceMatrix(locations: google.maps.LatLng[], travelMode: google.maps.TravelMode = this.defaultTravelMode): Promise<any> {
    const distanceMatrixRequest: google.maps.DistanceMatrixRequest = {
      origins: locations,
      destinations: locations,
      travelMode: travelMode
    };

    return new Promise((resolve, reject) => {
      this.distanceMatrixService.getDistanceMatrix(distanceMatrixRequest, function (response, status) {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          const origins = response.originAddresses;
          const destinations = response.destinationAddresses;
          const matrix = [];

          // TODO: refactor for loops!
          for (let i = 0; i < origins.length; i++) {
            const results = response.rows[i].elements;
            const tmp = [];
            for (let j = 0; j < results.length; j++) {
              const element = results[j];
              let distance = element.distance.value / 1000;
              if (i === j) { distance = Infinity; };
              tmp.push(distance);
            }
            matrix.push(tmp);
          }
          resolve(matrix);
        } else {
          reject({ summary: 'Distance Matrix Service failed', detail: status });
        }
      });
    });
  }
}
