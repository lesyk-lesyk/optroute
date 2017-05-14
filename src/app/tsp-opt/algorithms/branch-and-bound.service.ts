import { Injectable } from '@angular/core';

@Injectable()
export class BranchAndBoundService {

  constructor() {
    let testMatrix2 = [
      [Infinity, 2, 0, 3, 1, 2],
      [1, Infinity, 2, 1, 2, 3],
      [2, 2, Infinity, 5, 7, 4],
      [3, 3, 2, Infinity, 6, 6],
      [5, 2, 3, 4, Infinity, 8],
      [4, 2, 0, 3, 5, Infinity]
    ];

  }

  public optimize(matrix) {
    return new Promise((resolve, reject) => {

      let testMatrix = [
        [Infinity, 27, 43, 16, 30, 26],
        [7, Infinity, 16, 1, 30, 30],
        [20, 13, Infinity, 35, 5, 0],
        [21, 16, 25, Infinity, 18, 18],
        [12, 46, 27, 48, Infinity, 5],
        [23, 5, 5, 9, 5, Infinity]
      ];

      let mtrx: Matrix = new Matrix(testMatrix);
      console.table(mtrx.humanize());

      const solutionTree = new Tree();
      const rootIndex = solutionTree.addRoot(mtrx);

      // Ітерація 1
      // Крок 1 - Зведення матриці.
      this.matrixReduction(mtrx);
      // Сума звідних констант
      const constantsSum = mtrx.constantsSum;
      console.log(constantsSum);

      // Крок 2 - Шукаємо штрафи
      mtrx.calculateFines();
      // Шукаємо максимальний штраф
      let fine = this.findMaxFine(mtrx);
      console.log(fine);

      // Крок 4.1 - нижня оцінка не включаючи ребро
      let teta = new Teta();
      teta.h = fine.position.h;
      teta.k = fine.position.k;
      teta.valueExclude = mtrx.constantsSum + fine.maxFine;
      console.log(teta.valueExclude);

      solutionTree.addChild(rootIndex, teta.valueExclude, { h: teta.h, k: teta.k }, false, Matrix.clone(mtrx));

      // Крок 4.2 - нижня оцінка включаючи ребро
      let mtrx2 = Matrix.clone(mtrx);
      mtrx2.removeRowCol(fine.position.h, fine.position.k); // видалили рядок і стопчик
      this.matrixReduction(mtrx2); // звели матрицю
      teta.valueInclude = constantsSum + mtrx2.constantsSum;

      solutionTree.addChild(rootIndex, teta.valueInclude, { h: teta.h, k: teta.k }, true, Matrix.clone(mtrx2));
      
      // Крок 5 - вибираємо розгалуження

      // На першій ітерації після кроку 2 виконується крок 3.


      resolve(solutionTree.treantJsArr);
    });
  }

  private findMaxFine(matrix: Matrix) {
    let maxFine = -Infinity;
    let position = { h: undefined, k: undefined };
    for (let i = 0; i < matrix.size; i++) {
      for (let j = 0; j < matrix.size; j++) {
        if (matrix.matrix[i][j].fine > maxFine) {
          maxFine = matrix.matrix[i][j].fine;
          position = { h: i, k: j };
        }
      }
    }

    return {
      maxFine,
      position
    }
  }

  private matrixReduction(matrix: Matrix): void {
    // reduction by rows
    for (let i = 0; i < matrix.size; i++) {
      let min = Matrix.findMinInVector(matrix.matrix[i]);
      matrix.minValuesForRows[i] = min;

      matrix.matrix[i].forEach(cell => {
        cell.reduceValue(min);
      });
    }

    // reduction by cols
    for (let j = 0; j < matrix.size; j++) {
      let colVector = [];
      for (let i = 0; i < matrix.size; i++) {
        colVector.push(matrix.matrix[i][j]);
      }
      let min = Matrix.findMinInVector(colVector);
      matrix.minValuesForCols[j] = min;

      for (let i = 0; i < matrix.size; i++) {
        matrix.matrix[i][j].reduceValue(min);
      }
    }
  }
}

/* ------------------ MATRIX ---------------------*/

class Matrix {

  public static findMinInVector(vector: MatrixCell[]) {
    let min = Infinity;
    for (let i = 0; i < vector.length; i++) {
      if (vector[i].value < min) {
        min = vector[i].value;
      }
    }
    return min;
  }

  public static clone(mtrx: Matrix) {
    let newMatrix = new this();
    newMatrix.matrix = mtrx.matrix.slice();
    newMatrix.minValuesForCols = mtrx.minValuesForCols.slice();
    newMatrix.minValuesForRows = mtrx.minValuesForRows.slice();

    return newMatrix;
  }

  public matrix: MatrixCell[][] = [];
  public minValuesForCols: number[] = [];
  public minValuesForRows: number[] = [];

  constructor(private inputMatrix: number[][] = []) {
    this.fillMatrix(inputMatrix);
  }

  private fillMatrix(inputMatrix: number[][]) {
    this.minValuesForCols = new Array(inputMatrix.length);
    this.minValuesForRows = new Array(inputMatrix.length);
    this.matrix = new Array(inputMatrix.length);

    for (let i = 0; i < inputMatrix.length; i++) {
      this.matrix[i] = new Array(inputMatrix.length);
      for (let j = 0; j < inputMatrix.length; j++) {
        this.matrix[i][j] = new MatrixCell(inputMatrix[i][j]);
      }
    }
  }

  get size(): number {
    return this.matrix.length;
  }

  public humanize() {
    return this.matrix.map(row => {
      return row.map(item => {
        return item.humanize()
      });
    });
  }

  get constantsSum() {
    const sumCols = this.minValuesForCols.reduce((a, b) => a + b, 0);
    const sumRows = this.minValuesForRows.reduce((a, b) => a + b, 0);
    return sumCols + sumRows;
  }

  public calculateFines() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.matrix[i][j].value === 0) {
          this.matrix[i][j].fine = this.findMinInRowWithoutItself(i, j) + this.findMinInColWithoutItself(i, j);
        }
      }
    }
  }

  public findMinInRowWithoutItself(i, j) {
    let vector = this.matrix[i].slice();
    vector.splice(j, 1);
    return Matrix.findMinInVector(vector);
  }

  public findMinInColWithoutItself(i, j) {
    let vector = [];
    for (let n = 0; n < this.size; n++) {
      if (n !== i) {
        vector.push(this.matrix[n][j]);
      }
    }
    return Matrix.findMinInVector(vector);
  }

  removeRowCol(i, j) {
    // remove row
    this.matrix.splice(i, 1);
    //remove col
    const matrixSize = this.size;
    for (let i = 0; i < matrixSize; i++) {
      this.matrix[i].splice(j, 1);
    }
  }
}

/* ------------------ MATRIX CELL ---------------------*/

class MatrixCell {
  constructor(
    public value: number = null,
    public fine: number = 0
  ) { }

  public reduceValue(param) {
    this.value -= param;
  }

  public humanize() {
    if (this.fine > 0) {
      return `${this.value} (${this.fine})`;
    } else {
      return `${this.value}`;
    }
  }
}


/* ------------------ TETA  ---------------------*/

class Teta {
  constructor(
    public valueInclude: number = undefined,
    public valueExclude: number = undefined,
    public k: number = undefined,
    public h: number = undefined,
  ) { }
}
/* ------------------ TREE ---------------------*/

class Tree {
  private rootNodeIndex: NodeIndex;
  public treantJsArr = [];

  constructor(
    private nodes: Map<string, Node> = new Map()
  ) { }

  public addRoot(matrix: Matrix): NodeIndex {
    this.rootNodeIndex = new NodeIndex({ h: null, k: null }, undefined);
    const rootNode = new Node(null, null, null, { h: null, k: null }, null, matrix);
    this.nodes.set(this.rootNodeIndex.getIndex(), rootNode);
    this.treantJsArr.push(rootNode.treantJs);

    return this.rootNodeIndex;
  }

  public addChild(parentIndex: NodeIndex, bound: number, edge, includeEdge: boolean, matrix: Matrix): NodeIndex {
    const nodeIndex = new NodeIndex(edge, includeEdge);
    const parentNode = this.nodes.get(parentIndex.getIndex());
    const node = new Node(parentIndex.getIndex(), parentNode, bound, edge, includeEdge, matrix);
    this.nodes.set(nodeIndex.getIndex(), node);
    this.treantJsArr.push(node.treantJs);

    console.log('addChild', parentIndex, parentNode );
    
    return nodeIndex;
  }

}

/* ------------------ NODE ---------------------*/
class Node {
  public treantJs;

  constructor(
    public parentIndex: string = undefined,
    public parentNode: Node = undefined,
    public bound: number = undefined,
    public edge: { h: number, k: number } = { h: null, k: null },
    public includeEdge: boolean = undefined,
    public matrix: Matrix = undefined
  ) {
    if (parentIndex && parentNode) {
      this.treantJs = {
        parent: parentNode.treantJs,
        text: { name: `(${this.edge.h}, ${this.edge.k}) ${this.includeEdge ? '' : ' || '}`, title: bound }
      };
    } else {
      this.treantJs = {
        text: { name: '' }
      };
    }

  }
}

/* ------------------ NODE INDEX ---------------------*/
class NodeIndex {
  constructor(
    public edge: { h: number, k: number } = { h: null, k: null },
    public includeEdge: boolean = undefined,
  ) { }

  public getIndex() {
    return `(${this.edge.h}, ${this.edge.k}) ${this.includeEdge ? '' : ' |'})`
  }
}
