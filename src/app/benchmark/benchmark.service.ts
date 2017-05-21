import { Injectable } from '@angular/core';

@Injectable()
export class BenchmarkService {

  constructor() { }

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

  public measure(promise: Promise<any>) {
    return new Promise((resolve, reject) => {
      const timer = this.createTimer();
      promise
        .then(data => {
          const time = timer.stop();
          resolve({ data, time });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
