import { Injectable } from '@angular/core';

import { BruteForceService } from './../algorithms/brute-force.service';

@Injectable()
export class TspOptService {

  constructor(private bruteForceService: BruteForceService) { }

  public oprimizeRoute(matrix: number[][]) {
    return new Promise((resolve, reject) => {
      this.bruteForceService.bruteForce(matrix).then(order => {
        resolve(order);
      });
    });
  }
}
