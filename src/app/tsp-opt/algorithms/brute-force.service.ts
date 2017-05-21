import { Injectable } from '@angular/core';

import { HelpersService } from './../helpers/helpers.service';
import { OptimisationResult } from './../interfaces/optimisation-result';

@Injectable()
export class BruteForceService {

  private matrix: number[][];

  constructor(private helpersService: HelpersService) { }
  
  public optimize(matrix): Promise<OptimisationResult> {
    return new Promise((resolve, reject) => {

      const permArr = [];
      const usedChars = [];
      this.matrix = matrix.clone();

      function permute(input) {
        let ch;
        for (let i = 0; i < input.length; i++) {
          ch = input.splice(i, 1)[0];
          usedChars.push(ch);
          if (input.length === 0) {
            permArr.push(usedChars.slice());
          }
          permute(input);
          input.splice(i, 0, ch);
          usedChars.pop();
        }
        return permArr;
      };

      const arr = [];
      for (let i = 1; i < this.matrix.length; i++) {
        arr.push(i);
      }
      const permutedArray = permute(arr);
      permutedArray.forEach(item => { item.push(0); item.unshift(0); });

      let order = [];
      let minRoute = Infinity;

      for (let i = 0; i < permutedArray.length; i++) {
        let sum = 0;
        for (let j = 0; j < permutedArray[i].length - 1; j++) {
          sum += this.matrix[permutedArray[i][j]][permutedArray[i][j + 1]];
        }
        if (sum < minRoute) { minRoute = sum; order = permutedArray[i]; };
      }
      order.pop();

      resolve({
        order: order.clone(),
        cost: this.helpersService.calculateRouteCost(this.matrix, order)
      });
    });
  }
}
