import { Injectable } from '@angular/core';
import { HelpersService } from './../helpers/helpers.service';

@Injectable()
export class DynamicProgrammingService {

  private g: number[][];
  private p: number[][];
  private npow: number;
  private N: number;
  private n: number;
  private d: number[][];
  private outputArray: number[];
  private best: number[];
  private matrix: number[][];

  constructor(private helpersService: HelpersService) { }

  private DPInitialize(matrix: number[][]) {
    this.g = [];
    this.p = [];
    this.npow = null;
    this.N = null;
    this.n = matrix[0].length;
    this.d = [];
    this.outputArray = [];
    this.best = [];
    this.matrix = this.helpersService.replaceInfToZero(matrix.clone());
  }

  public optimize(matrix: number[][]) {
    return new Promise((resolve, reject) => {
      this.DPInitialize(matrix);
      if (this.n > 20) {
        reject('Too many point to calculate for Dynamic Programing algorithm');
      } else {
        this.DPCompute();
        resolve({
          order: this.best.clone(),
          cost: this.helpersService.calculateRouteCost(this.matrix, this.best)
        });
      }
    });
  }

  private DPCompute() {
    let i, j;

    let inputArray = this.matrix;
    this.N = this.n;
    this.npow = Math.pow(2, this.N);
    this.g = new Array(this.n);
    this.p = new Array(this.n);
    for (i = 0; i < this.n; i++) {
      // console.log('this.N', this.N);
      // console.log('this.n', this.n);
      // console.log('npow', this.npow);
      this.g[i] = new Array(this.npow);
      this.p[i] = new Array(this.npow);
      for (j = 0; j < this.npow; j++) {
        this.g[i][j] = -1;
        this.p[i][j] = -1;
      }
    }
    this.d = inputArray;
    for (i = 0; i < this.n; i++) {
      this.g[i][0] = inputArray[i][0];
    }

    let result = this.tsp(0, this.npow - 2);
    this.outputArray.push(0);
    this.getPath(0, this.npow - 2);
    this.outputArray.push(result);

    for (i = 0; i < this.n; i++) {
      this.best.push(this.outputArray[i]);
    }
  }

  private tsp(start, set) {
    let masked, mask, result = -1, temp;
    if (this.g[start][set] != -1) {
      return this.g[start][set];
    } else {
      for (let x = 0; x < this.N; x++) {
        mask = this.npow - 1 - Math.pow(2, x);
        masked = set & mask;
        if (masked != set) {
          temp = this.d[start][x] + this.tsp(x, masked);
          if (result == -1 || result > temp) {
            result = temp;
            this.p[start][set] = x;
          }
        }
      }
      this.g[start][set] = result;
      return result;
    }
  }

  private getPath(start, set) {
    if (this.p[start][set] == -1) {
      return;
    }
    let x = this.p[start][set];
    let mask = this.npow - 1 - Math.pow(2, x);
    let masked = set & mask;
    this.outputArray.push(x);
    this.getPath(x, masked);
  }
}
