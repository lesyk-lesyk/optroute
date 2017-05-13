import { Injectable } from '@angular/core';

import { BruteForceService } from './../algorithms/brute-force.service';
import { NearestNeighbourService } from './../algorithms/nearest-neighbour.service';

@Injectable()
export class TspOptService {

  constructor(
    private bruteForceService: BruteForceService,
    private nearestNeighbourService: NearestNeighbourService
  ) { }

  public oprimizeRoute(matrix: number[][]) {
    return new Promise((resolve, reject) => {
      this.bruteForceService.optimize(matrix).then(order => {
        // resolve(order);
      });
      this.nearestNeighbourService.optimize(matrix).then(order => {
        resolve(order);
      });
    });
  }
}
