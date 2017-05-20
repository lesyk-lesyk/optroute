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
}
