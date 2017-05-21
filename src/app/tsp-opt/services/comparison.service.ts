import { Injectable } from '@angular/core';
import { OptimisationResult } from './../interfaces/optimisation-result';

@Injectable()
export class ComparisonService {

  private results: Map<string, OptimisationResult>;

  constructor() {
    this.results = new Map();
  }

  public add(result: OptimisationResult): void {
    this.results.set(result.name, result);
    console.log(this.results);    
  }

  get allResults(): Map<string, OptimisationResult> {
    return this.results;
  }

  public clear(): void {
    this.results.clear();
  }

  public getBestResult(): OptimisationResult {
    let bestCost = Infinity;
    let bestResult;
    console.log(this.results);
    
    this.results.forEach(result => {
      if (result.cost < bestCost) {
        console.log(result.cost < bestCost);
        bestCost = result.cost;
        bestResult = result;
      }
    });
    console.log('getBestResult', bestResult);
    
    return bestResult;
  }
}
