import { Injectable } from '@angular/core';
import { WebWorkerService } from 'angular2-web-worker';

@Injectable()
export class BenchmarkService {

  constructor(private webWorkerService: WebWorkerService) { }

  private createTimer() {
    const start = performance.now();
    return {
      stop: function () {
        const end = performance.now();
        const time = end - start;
        return time;
      }
    }
  };

  public measure(func, data) {
    return new Promise((resolve, reject) => {
      const timer = this.createTimer();

      const workerPromise = this.webWorkerService.run(func, data);
      workerPromise.then(result => {
        const time = timer.stop();
        resolve({ data, time });
      }).catch(error => {
        console.log(error);
        reject(error);
      })
    });
  }
}
