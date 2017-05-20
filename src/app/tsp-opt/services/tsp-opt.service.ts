import { Injectable } from '@angular/core';

import { BruteForceService } from './../algorithms/brute-force.service';
import { NearestNeighbourService } from './../algorithms/nearest-neighbour.service';
import { BranchAndBoundService } from './../algorithms/branch-and-bound.service';
import { HeldKarpService } from './../algorithms/held-karp.service';
import { DynamicProgrammingService } from './../algorithms/dynamic-programming.service';
import { GeneticService } from './../algorithms/genetic.service';

@Injectable()
export class TspOptService {

  constructor(
    private bruteForceService: BruteForceService,
    private nearestNeighbourService: NearestNeighbourService,
    private branchAndBoundService: BranchAndBoundService,
    private heldKarpService: HeldKarpService,
    private dynamicProgrammingService: DynamicProgrammingService,
    private geneticService: GeneticService
  ) { }

  public oprimizeRoute(matrix: number[][]) {
    return new Promise((resolve, reject) => {
      // this.bruteForceService.optimize(matrix).then(order => {
      //   resolve(order);
      // });
      // this.nearestNeighbourService.optimize(matrix).then(order => {
      //   resolve(order);
      // });
      // this.branchAndBoundService.optimize(matrix).then(order => {
      //   resolve(order);
      // });
      // this.heldKarpService.optimize(matrix).then(order => {
      //   resolve(order);
      // });
      this.dynamicProgrammingService.optimize(matrix).then(order => {
        resolve(order);
      });
      // this.geneticService.optimize(matrix).then(order => {
      //   resolve(order);
      // });
    });
  }
}
