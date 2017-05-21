import { OptimisationResult } from './../interfaces/optimisation-result';
import { Injectable } from '@angular/core';

import { BruteForceService } from './../algorithms/brute-force.service';
import { NearestNeighbourService } from './../algorithms/nearest-neighbour.service';
import { BranchAndBoundService } from './../algorithms/branch-and-bound.service';
import { HeldKarpService } from './../algorithms/held-karp.service';
import { DynamicProgrammingService } from './../algorithms/dynamic-programming.service';
import { GeneticService } from './../algorithms/genetic.service';
import { BenchmarkService } from "app/benchmark/benchmark.service";

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
  ) { }

  public oprimizeRoute(matrix: number[][]) {
    
    return new Promise((resolve, reject) => {
      let bruteForceServiceTimer = this.benchmarkService.createTimer('bruteForceService');
      this.bruteForceService.optimize(matrix).then((data) => {
        bruteForceServiceTimer.stop();
      });

      let nearestNeighbourTimer = this.benchmarkService.createTimer('nearestNeighbourService');
      this.nearestNeighbourService.optimize(matrix).then((data) => {
        nearestNeighbourTimer.stop();
      });

      let branchAndBoundServiceTimer = this.benchmarkService.createTimer('branchAndBoundService');
      this.branchAndBoundService.optimize(matrix).then((data) => {
        branchAndBoundServiceTimer.stop();
      });

      let heldKarpServiceTimer = this.benchmarkService.createTimer('heldKarpService');
      this.heldKarpService.optimize(matrix).then((data) => {
        heldKarpServiceTimer.stop();
      });

      let dynamicProgrammingServiceTimer = this.benchmarkService.createTimer('dynamicProgrammingService');
      this.dynamicProgrammingService.optimize(matrix).then((data) => {
        dynamicProgrammingServiceTimer.stop();
      });

      let geneticServiceTimer = this.benchmarkService.createTimer('geneticService');
      this.geneticService.optimize(matrix).then((data) => {
        geneticServiceTimer.stop();
      });
    });
  }
}
