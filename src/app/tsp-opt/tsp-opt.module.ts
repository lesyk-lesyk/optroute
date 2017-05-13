import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TspOptService } from './services/tsp-opt.service';
import { BruteForceService } from './algorithms/brute-force.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    TspOptService,
    BruteForceService
  ]
})
export class TspOptModule { }
