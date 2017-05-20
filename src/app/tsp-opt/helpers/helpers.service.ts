import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {

  /**
   * Replace infinity to zero on digonal elements
   * @param matrix - matrix with infinite values on diagonal
   */
  public replaceInfToZero(matrix: number[][]) {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][i] = 0;
    }
    return matrix;
  }

  /**
   * Check existing item in array
   * @param array - array of items
   * @param item - item for check
   */
  public checkExist(array: any[], item: any) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == item) {
        return true;
      }
    }
    return false;
  }

  /**
   * Create boolean matrix with 'false' values
   * @param n - size of matrix
   */
  public createBooleanArr(n): boolean[][] {
    var arr = new Array(n);
    for (var i = 0; i < n; i++) {
      arr[i] = new Array(n);
      for (var j = 0; j < n; j++) {
        arr[i][j] = false;
      }
    }
    return arr;
  }

  /**
   * Create matrix with zero values
   * @param n - size of matrix
   */
  public createNumber2DArr(n): number[][] {
    var arr = new Array(n);
    for (var i = 0; i < n; i++) {
      arr[i] = new Array(n);
      for (var j = 0; j < n; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }

  /**
   * Create array with zero values
   * @param n - size of array
   */
  public createNumber1DArr(n): number[] {
    var arr = new Array(n);
    for (var i = 0; i < n; i++) {
      arr[i] = 0;
    }
    return arr;
  }

  // TODO: Fix bug with 2^6 !!!
  /**
   * Calculate math power
   * @param x - value
   * @param n - power
   */
  power(x, n) {
    if (n === 0) return 1;
    if (n === -1) return 1 / x;
    if (n === 1) return x;
    return Math.exp(n * Math.log(x))
  }
}
