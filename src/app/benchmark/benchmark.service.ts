import { Injectable } from '@angular/core';

@Injectable()
export class BenchmarkService {

  constructor() { }

  public createTimer(test) {
    const start = performance.now();
    return {
      stop: function () {
        const end = performance.now();
        const time = end - start;
        return time;
      }
    }
  };
}
