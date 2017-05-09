import { Injectable } from '@angular/core';
import { FormatterService } from 'app/core/services/formatter.service';

@Injectable()
export class GMapCalculationsService {

  constructor(private formatterService: FormatterService) { }

  public getRouteInfo(route: google.maps.DirectionsRoute) {
    let totalLength = 0;
    let totalDuration = 0;

    // TODO: refactor for loop!
    for (let i = 0; i < route.legs.length; i++) {
      const routeSegment = i + 1;
      totalLength += route.legs[i].distance.value;
      totalDuration += route.legs[i].duration.value;
    }

    return {
      length: this.formatterService.formatLength(totalLength),
      duration: this.formatterService.formatDuration(totalDuration)
    };
  }
}
