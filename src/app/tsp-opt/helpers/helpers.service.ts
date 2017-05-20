import { Injectable } from '@angular/core';

declare global {
  interface Array<T> {
    clone(): Array<T>;
    shuffle(): Array<T>;
    swap(i, j): void;
    next(i): T;
    previous(i): T;
    deleteByValue(param): void;
  }
}

Array.prototype.clone = function <T>(): T[] {
  return this.slice(0);
}

Array.prototype.shuffle = function () {
  for (let j, x, i = this.length - 1; i; j = HelpersService.randomNumber(i), x = this[--i], this[i] = this[j], this[j] = x);
  return this;
};

Array.prototype.swap = function (i, j) {
  if (i > this.length || j > this.length || i === j) { return }
  const tem = this[i];
  this[i] = this[j];
  this[j] = tem;
}

Array.prototype.next = function (index) {
  if (index === this.length - 1) {
    return this[0];
  } else {
    return this[index + 1];
  }
}

Array.prototype.previous = function (index) {
  if (index === 0) {
    return this[this.length - 1];
  } else {
    return this[index - 1];
  }
}

Array.prototype.deleteByValue = function (value) {
  var pos = this.indexOf(value);
  this.splice(pos, 1);
}

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

  /**
   * Generate an array with shuffled integers
   * @param n - length of array
   */
  randomIndivial(n: number): number[] {
    var a: number[] = [];
    for (let i = 0; i < n; i++) {
      a.push(i);
    }
    return a.shuffle();
  }

  /**
   * Generate random number from zero to boudary
   * @param boundary
   */
  public randomNumber(boundary) {
    return parseInt((Math.random() * boundary).toString());
  }

  public static randomNumber(boundary) {
    return parseInt((Math.random() * boundary).toString());
  };

  /**
   * Reformat array - swap part or array to beginnig
   * [1,2,0,3] -> [0,3,1,2]
   * @param array - array of city order
   */
  public reformatArray(array: any[]): any[] {
    const zeroIndex = array.indexOf(0);
    return array.slice(zeroIndex).concat(array.slice(0, zeroIndex));
  }
}
