import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TspOptService } from './services/tsp-opt.service';
import { BruteForceService } from './algorithms/brute-force.service';
import { NearestNeighbourService } from './algorithms/nearest-neighbour.service';
import { BranchAndBoundService } from './algorithms/branch-and-bound.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    TspOptService,
    BruteForceService,
    NearestNeighbourService,
    BranchAndBoundService,
  ]
})
export class TspOptModule { }
