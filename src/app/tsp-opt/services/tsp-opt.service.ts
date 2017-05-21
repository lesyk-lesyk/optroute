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

      this.benchmarkService.measure(this.bruteForceService.optimize(matrix))
        .then((results: { data: OptimisationResult, time: number }) => {
          console.log('bruteForceService', results.data, results.time);
          resolve(results.data.order);
        });

      this.benchmarkService.measure(this.nearestNeighbourService.optimize(matrix))
        .then((results: { data: OptimisationResult, time: number }) => {
          console.log('nearestNeighbourService', results.data, results.time);
          // resolve(results.order);
        });

      this.benchmarkService.measure(this.branchAndBoundService.optimize(matrix))
        .then((results: { data: OptimisationResult, time: number }) => {
          console.log('branchAndBoundService', results.data, results.time);
          // resolve(results.order);
        });

      this.benchmarkService.measure(this.heldKarpService.optimize(matrix))
        .then((results: { data: OptimisationResult, time: number }) => {
          console.log('heldKarpService', results.data, results.time);
          // resolve(results.order);
        });

      this.benchmarkService.measure(this.dynamicProgrammingService.optimize(matrix))
        .then((results: { data: OptimisationResult, time: number }) => {
          console.log('dynamicProgrammingService', results.data, results.time);
          // resolve(results.order);
        });

      this.benchmarkService.measure(this.geneticService.optimize(matrix))
        .then((results: { data: OptimisationResult, time: number }) => {
          console.log('geneticService', results.data, results.time);
          // resolve(results.order);
        });
    });
  }
}
