import { Injectable } from '@angular/core';
import { HelpersService } from './../helpers/helpers.service';

@Injectable()
export class HeldKarpService {

  private n;
  // cost matrix
  private cost;
  // matrix of adjusted costs
  private costWithPi;
  private bestNode = new QNode();
  private bnbhkFinish = false;
  private bnbhkRunning = false;
  private best = [];

  constructor(private helpersService: HelpersService) { }

  BNBHKInitialize(matrix) {
    this.n = matrix[0].length;
    this.cost = this.helpersService.replaceInfToZero(matrix.clone());
    this.bestNode = new QNode();
    this.bestNode.lowerBound = Number.MAX_VALUE;
    this.costWithPi = this.helpersService.createNumber2DArr(this.n);
    this.best = [];
  }

  public optimize(matrix: number[][]) {
    return new Promise((resolve, reject) => {
      this.BNBHKInitialize(matrix);
      if (this.n > 50) {
        reject("Too many point to calculate for Branch and Bound algorithm");
      } else {
        this.BNBHKSolve();
        // TODO: refactor!
        this.best.unshift(0);
        this.best.pop();
        resolve(this.best.clone());
      }
    });
  }

  private BNBHKSolve() {
    var currentNode = new QNode();
    currentNode.excluded = this.helpersService.createBooleanArr(this.n);
    this.computeHeldKarp(currentNode);
    var pq = new PriorityQueue();
    do {
      do {
        var i = -1;
        for (var j = 0; j < this.n; j++) {
          if (currentNode.degree[j] > 2 && (i < 0 || currentNode.degree[j] < currentNode.degree[i])) i = j;
        }
        if (i < 0) {
          if (currentNode.lowerBound < this.bestNode.lowerBound) {
            this.bestNode = currentNode;
            console.log("%.0f", this.bestNode.lowerBound);
          }
          break;
        }
        console.log(".");
        var children = new PriorityQueue();
        children.push(this.exclude(currentNode, i, currentNode.parent[i]));
        for (var j = 0; j < this.n; j++) {
          if (currentNode.parent[j] == i) children.push(this.exclude(currentNode, i, j));
        }
        currentNode = children.poll();
        pq.pushAll(children);
      } while (currentNode.lowerBound < this.bestNode.lowerBound);
      console.log("%n");
      currentNode = pq.poll();
    } while (currentNode != null && currentNode.lowerBound < this.bestNode.lowerBound);
    // output suitable for gnuplot
    // set style data vector
    console.log("# %.0f%n", this.bestNode.lowerBound);
    var jj = 0;
    do {
      var ii = this.bestNode.parent[jj];
      //Console.log("%f\t%f\t%f\t%f%n", x[j], y[j], x[i] - x[j], y[i] - y[j]);
      this.best.push(ii);
      jj = ii;
    } while (jj != 0);
  }

  private exclude(node, i, j) {
    var child = new QNode();
    child.excluded = node.excluded.clone();
    child.excluded[i] = node.excluded[i].clone();
    child.excluded[j] = node.excluded[j].clone();
    child.excluded[i][j] = true;
    child.excluded[j][i] = true;
    this.computeHeldKarp(child);
    return child;
  }

  private computeHeldKarp(node) {
    node.pi = this.helpersService.createNumber1DArr(this.n);
    node.lowerBound = Number.MIN_VALUE;
    node.degree = this.helpersService.createNumber1DArr(this.n);
    node.parent = this.helpersService.createNumber1DArr(this.n);
    var lambda = 0.1;
    while (lambda > 1e-06) {
      var previousLowerBound = node.lowerBound;
      this.computeOneTree(node);
      if (!(node.lowerBound < this.bestNode.lowerBound)) return;
      if (!(node.lowerBound < previousLowerBound)) lambda *= 0.9;
      var denom = 0;
      for (var i = 1; i < this.n; i++) {
        var d = node.degree[i] - 2;
        denom += d * d;
      }
      if (denom == 0) return;
      var t = lambda * node.lowerBound / denom;
      for (var i = 1; i < this.n; i++) node.pi[i] += t * (node.degree[i] - 2);
    }
  }

  private computeOneTree(node) {
    // compute adjusted costs
    node.lowerBound = 0.0;
    for (var j = 0; j < this.n; j++) {
      node.degree[j] = 0;
    }
    for (var i = 0; i < this.n; i++) {
      for (var j = 0; j < this.n; j++) {
        var _cost = node.excluded[i][j] ? Number.MAX_VALUE : this.cost[i][j] + node.pi[i] + node.pi[j];
        this.costWithPi[i][j] = _cost;
      }
    }
    var firstNeighbor;
    var secondNeighbor;
    // find the two cheapest edges from 0
    if (this.costWithPi[0][2] < this.costWithPi[0][1]) {
      firstNeighbor = 2;
      secondNeighbor = 1;
    } else {
      firstNeighbor = 1;
      secondNeighbor = 2;
    }
    for (var j = 3; j < this.n; j++) {
      if (this.costWithPi[0][j] < this.costWithPi[0][secondNeighbor]) {
        if (this.costWithPi[0][j] < this.costWithPi[0][firstNeighbor]) {
          secondNeighbor = firstNeighbor;
          firstNeighbor = j;
        } else {
          secondNeighbor = j;
        }
      }
    }
    this.addEdge(node, 0, firstNeighbor);
    for (var j = 0; j < this.n; j++) {
      node.parent[j] = firstNeighbor;
    }
    node.parent[firstNeighbor] = 0;
    // compute the minimum spanning tree on nodes 1..n-1
    var minCost = this.costWithPi[firstNeighbor].clone();
    for (var k = 2; k < this.n; k++) {
      var idx = 1;
      for (idx = 1; idx < this.n; idx++) {
        if (node.degree[idx] == 0) break;
      }
      for (var j = idx + 1; j < this.n; j++) {
        if (node.degree[j] == 0 && minCost[j] < minCost[idx]) idx = j;
      }
      this.addEdge(node, node.parent[idx], idx);
      for (var j = 1; j < this.n; j++) {
        if (node.degree[j] == 0 && this.costWithPi[idx][j] < minCost[j]) {
          minCost[j] = this.costWithPi[idx][j];
          node.parent[j] = idx;
        }
      }
    }
    this.addEdge(node, 0, secondNeighbor);
    node.parent[0] = secondNeighbor;
    node.lowerBound = Math.trunc(node.lowerBound);
  }

  private addEdge(node, i, j) {
    var q = node.lowerBound;
    node.lowerBound += this.costWithPi[i][j];
    node.degree[i]++;
    node.degree[j]++;
  }
}


/* Models for solving held-karp */

class QNode {
  constructor(
    public excluded: any[] = [],
    public pi: any[] = [],
    public lowerBound: number = Number.MAX_VALUE,
    public degree: any[] = [],
    public parent: any[] = [],
  ) { }

  public toString() {
    return this.lowerBound;
  }
}

class PriorityQueue {
  constructor(
    private heap: any[] = [],
  ) { }

  public push(node) {
    this.bubble(this.heap.push(node) - 1);
  }

  public pushAll(queue) {
    while (queue.heap.length > 0) {
      this.push(queue.poll());
    }
  }

  public poll() {
    var topVal = this.heap[1];
    this.heap[1] = this.heap.pop();
    this.sink(1); return topVal;
  }

  public bubble(i) {
    while (i > 1) {
      var parentIndex = i >> 1;
      if (!this.isHigherPriority(i, parentIndex)) break;
      this.swap(i, parentIndex);
      i = parentIndex;
    }
  }

  public sink(i) {
    while (i * 2 < this.heap.length) {
      var leftHigher = !this.isHigherPriority(i * 2 + 1, i * 2);
      var childIndex = leftHigher ? i * 2 : i * 2 + 1;
      if (this.isHigherPriority(i, childIndex)) break;
      this.swap(i, childIndex);
      i = childIndex;
    }
  }

  public swap(i, j) {
    var temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  public isHigherPriority(i, j) {
    return this.heap[i].lowerBound < this.heap[j].lowerBound;
  }
}
