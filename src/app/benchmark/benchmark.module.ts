import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebWorkerService } from 'angular2-web-worker';

import { BenchmarkService } from './benchmark.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    BenchmarkService,
    WebWorkerService,
  ]
})
export class BenchmarkModule { }
