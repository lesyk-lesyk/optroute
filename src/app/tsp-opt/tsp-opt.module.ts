import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpersModule } from './helpers/helpers.module';
import { BenchmarkModule } from "app/benchmark/benchmark.module";

import { TspOptService } from './services/tsp-opt.service';
import { BruteForceService } from './algorithms/brute-force.service';
import { NearestNeighbourService } from './algorithms/nearest-neighbour.service';
import { BranchAndBoundService } from './algorithms/branch-and-bound.service';
import { HeldKarpService } from './algorithms/held-karp.service';
import { DynamicProgrammingService } from './algorithms/dynamic-programming.service';
import { GeneticService } from './algorithms/genetic.service';

@NgModule({
  imports: [
    CommonModule,
    HelpersModule,
    BenchmarkModule,
  ],
  declarations: [],
  providers: [
    TspOptService,
    BruteForceService,
    NearestNeighbourService,
    BranchAndBoundService,
    HeldKarpService,
    DynamicProgrammingService,
    GeneticService,
  ]
})
export class TspOptModule { }
