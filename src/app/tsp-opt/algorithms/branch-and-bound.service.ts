import { Injectable } from '@angular/core';
import { HelpersService } from './../helpers/helpers.service';

@Injectable()
export class BranchAndBoundService {

  private sourceCity;
  private initialRoute;
  private optimumRoute;
  private nodes;
  private routeCost;
  private optimumCost;
  private matrix;
  private cityCount;

  constructor(private helpersService: HelpersService) { }

  private BNBInitialize(matrix) {
    this.sourceCity = 0
    this.initialRoute = [];
    this.optimumRoute = [];
    this.nodes = 1;
    this.routeCost = 0;
    this.optimumCost = Number.MAX_VALUE;
    this.matrix = this.helpersService.replaceInfToZero(matrix);
    this.cityCount = this.matrix[0].length;
  }

  public optimize(matrix: number[][]) {
    return new Promise((resolve, reject) => {
      if (matrix.length > 15) {
        reject('Too many point to calculate for Branch and Bound algorithm');
      } else {
        this.BNBInitialize(matrix);
        this.BNBSearch(this.sourceCity, this.initialRoute);
        this.optimumRoute.pop();
        resolve(this.optimumRoute.clone());
      }
    });
  }

  private BNBSearch(from, followedRoute) {
    if (followedRoute.length == this.cityCount) {
      followedRoute.push(this.sourceCity);
      this.nodes++;
      this.routeCost += this.matrix[from][this.sourceCity];
      if (this.routeCost < this.optimumCost) {
        this.optimumCost = this.routeCost;
        this.optimumRoute = followedRoute.clone();
      }
      this.routeCost -= this.matrix[from][this.sourceCity];
    }
    else {
      for (let to = 0; to < this.cityCount; to++) {
        if (!this.helpersService.checkExist(followedRoute, to)) {
          this.routeCost += this.matrix[from][to];
          if (this.routeCost < this.optimumCost) {
            let increasedRoute = followedRoute.clone();
            increasedRoute.push(to);
            this.nodes++;
            this.BNBSearch(to, increasedRoute);
          }
          this.routeCost -= this.matrix[from][to];
        }
      }
    }
  }
}
