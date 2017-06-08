import { OptimisationResult } from './../interfaces/optimisation-result';
import { Injectable } from '@angular/core';

import { BruteForceService } from './../algorithms/brute-force.service';
import { NearestNeighbourService } from './../algorithms/nearest-neighbour.service';
import { BranchAndBoundService } from './../algorithms/branch-and-bound.service';
import { HeldKarpService } from './../algorithms/held-karp.service';
import { DynamicProgrammingService } from './../algorithms/dynamic-programming.service';
import { GeneticService } from './../algorithms/genetic.service';
import { BenchmarkService } from "app/benchmark/benchmark.service";
import { ComparisonService } from './comparison.service';

@Injectable()
export class TspOptService {

  constructor(
    private bruteForceService: BruteForceService,
    private nearestNeighbourService: NearestNeighbourService,
    private branchAndBoundService: BranchAndBoundService,
    private heldKarpService: HeldKarpService,
    private dynamicProgrammingService: DynamicProgrammingService,
    private geneticService: GeneticService,
    private benchmarkService: BenchmarkService,
    private comparisonService: ComparisonService
  ) { }

  public oprimizeRoute(matrix: number[][]) {

    return new Promise((resolve, reject) => {

      let bruteForceServiceTimer = this.benchmarkService.createTimer('bruteForceService');
      this.bruteForceService.optimize(matrix)
        .then((result) => {
          const time = bruteForceServiceTimer.stop();
          result.searchTime = time;
          this.comparisonService.add(result);
          console.log(result.order, result.cost, result.searchTime);
        })
        .then(() => {
          let nearestNeighbourTimer = this.benchmarkService.createTimer('nearestNeighbourService');
          return this.nearestNeighbourService.optimize(matrix)
            .then((result) => {
              const time = nearestNeighbourTimer.stop();
              result.searchTime = time;
              this.comparisonService.add(result);
              console.log(result.order, result.cost, result.searchTime);
            });
        })
        .then(() => {
          let branchAndBoundServiceTimer = this.benchmarkService.createTimer('branchAndBoundService');
          return this.branchAndBoundService.optimize(matrix).then((result) => {
            const time = branchAndBoundServiceTimer.stop();
            result.searchTime = time;
            this.comparisonService.add(result);
            console.log(result.order, result.cost, result.searchTime);
          });
        })
        .then(() => {
          let heldKarpServiceTimer = this.benchmarkService.createTimer('heldKarpService');
          return this.heldKarpService.optimize(matrix).then((result) => {
            const time = heldKarpServiceTimer.stop();
            result.searchTime = time;
            this.comparisonService.add(result);
            console.log(result.order, result.cost, result.searchTime);
          });
        })
        .then(() => {
          let dynamicProgrammingServiceTimer = this.benchmarkService.createTimer('dynamicProgrammingService');
          return this.dynamicProgrammingService.optimize(matrix).then((result) => {
            const time = dynamicProgrammingServiceTimer.stop();
            result.searchTime = time;
            this.comparisonService.add(result);
            console.log(result.order, result.cost, result.searchTime);
          });
        })
        .then(() => {
          const bestResult = this.comparisonService.getBestResult();
          console.log('last then', bestResult);
          resolve(bestResult);
        });
    });
  }
}
