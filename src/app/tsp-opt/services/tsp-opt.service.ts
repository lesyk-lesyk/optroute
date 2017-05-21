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
    console.table(matrix);
    
    return new Promise((resolve, reject) => {
      this.bruteForceService.optimize(matrix).then((results: {order, cost}) => {
        console.log('bruteForceService', results.order, results.cost);
        resolve(results.order);
      });
      this.nearestNeighbourService.optimize(matrix).then((results: {order, cost}) => {
        console.log('nearestNeighbourService', results.order, results.cost);
        resolve(results.order);
      });
      this.branchAndBoundService.optimize(matrix).then((results: {order, cost}) => {
        console.log('branchAndBoundService', results.order, results.cost);
        resolve(results.order);
      });
      this.heldKarpService.optimize(matrix).then((results: {order, cost}) => {
        console.log('heldKarpService', results.order, results.cost);
        resolve(results.order);
      });
      this.dynamicProgrammingService.optimize(matrix).then((results: {order, cost}) => {
        console.log('dynamicProgrammingService', results.order, results.cost);
        resolve(results.order);
      });
      this.geneticService.optimize(matrix).then((results: {order, cost}) => {
        console.log('geneticService', results.order, results.cost);
        resolve(results.order);
      });
    });
  }
}
