import { Injectable } from '@angular/core';
import { HelpersService } from './../helpers/helpers.service';
import { OptimisationResult } from './../interfaces/optimisation-result';

@Injectable()
export class GeneticService {

  private POPULATION_SIZE: number;
  private CROSSOVER_PROBABILITY: number;
  private MUTATION_PROBABILITY: number;
  private UNCHANGED_GENS: number;

  private mutationTimes: number;
  private bestValue: number
  private best: number[];
  private currentGeneration: number;
  private currentBest: { bestValue: number, bestPosition: number };
  private population = [];
  private values: number[]
  private fitnessValues: number[];
  private roulette: number[];
  private matrix: number[][];
  private pointsLength: number;

  constructor(private helpersService: HelpersService) { }

  private GAInitialize(matrix) {
    this.POPULATION_SIZE = 30;
    this.CROSSOVER_PROBABILITY = 0.9;
    this.MUTATION_PROBABILITY = 0.01;
    this.UNCHANGED_GENS = 0;

    this.mutationTimes = 0;
    this.bestValue = undefined;
    this.best = [];
    this.currentGeneration = 0;
    this.currentBest = { bestValue: 0, bestPosition: 0 };
    this.population = [];
    this.values = new Array(this.POPULATION_SIZE);
    this.fitnessValues = new Array(this.POPULATION_SIZE);
    this.roulette = new Array(this.POPULATION_SIZE);
    this.matrix = this.helpersService.replaceInfToZero(matrix.clone());
    this.pointsLength = this.matrix.length;

    for (let i = 0; i < this.POPULATION_SIZE; i++) {
      this.population.push(this.helpersService.randomIndivial(this.pointsLength));
    }
    this.setBestValue();
  }

  public optimize(matrix: number[][]): Promise<OptimisationResult> {
    return new Promise((resolve, reject) => {
      this.GAInitialize(matrix);

      do {
        this.GANextGeneration();
      }
      while (this.currentGeneration < 10000);

      const reformattedOrder = this.helpersService.reformatArray(this.best);
      resolve({
        order: reformattedOrder,
        cost: this.helpersService.calculateRouteCost(this.matrix, reformattedOrder)
      });
    });
  }

  private GANextGeneration() {
    this.currentGeneration++;
    this.selection();
    this.crossover();
    this.mutation();
    this.setBestValue();
  }

  private tribulate() {
    for (let i = this.population.length >> 1; i < this.POPULATION_SIZE; i++) {
      this.population[i] = this.helpersService.randomIndivial(this.pointsLength);
    }
  }

  private selection() {
    let parents = new Array();
    let initnum = 4;
    parents.push(this.population[this.currentBest.bestPosition]);
    parents.push(this.doMutate(this.best.clone()));
    parents.push(this.pushMutate(this.best.clone()));
    parents.push(this.best.clone());

    this.setRoulette();
    for (let i = initnum; i < this.POPULATION_SIZE; i++) {
      parents.push(this.population[this.wheelOut(Math.random())]);
    }
    this.population = parents;
  }

  private crossover() {
    let queue = new Array();
    for (let i = 0; i < this.POPULATION_SIZE; i++) {
      if (Math.random() < this.CROSSOVER_PROBABILITY) {
        queue.push(i);
      }
    }
    queue.shuffle();
    for (let i = 0, j = queue.length - 1; i < j; i += 2) {
      this.doCrossover(queue[i], queue[i + 1]);
    }
  }

  private doCrossover(x, y) {
    const child1 = this.getChild('next', x, y);
    const child2 = this.getChild('previous', x, y);
    this.population[x] = child1;
    this.population[y] = child2;
  }

  private getChild(fun, x, y) {
    let solution = new Array();
    let px = this.population[x].clone();
    let py = this.population[y].clone();
    let dx, dy;
    let c = px[this.helpersService.randomNumber(px.length)];
    solution.push(c);
    while (px.length > 1) {
      dx = px[fun](px.indexOf(c));
      dy = py[fun](py.indexOf(c));
      px.deleteByValue(c);
      py.deleteByValue(c);
      c = this.matrix[c][dx] < this.matrix[c][dy] ? dx : dy;
      solution.push(c);
    }
    return solution;
  }

  private mutation() {
    for (let i = 0; i < this.POPULATION_SIZE; i++) {
      if (Math.random() < this.MUTATION_PROBABILITY) {
        if (Math.random() > 0.5) {
          this.population[i] = this.pushMutate(this.population[i]);
        } else {
          this.population[i] = this.doMutate(this.population[i]);
        }
        i--;
      }
    }
  }

  private preciseMutate(orseq) {
    let seq = orseq.clone();
    if (Math.random() > 0.5) {
      seq.reverse();
    }
    let bestv = this.evaluate(seq);
    for (let i = 0; i < (seq.length >> 1); i++) {
      for (let j = i + 2; j < seq.length - 1; j++) {
        let new_seq = this.swap_seq(seq, i, i + 1, j, j + 1);
        let v = this.evaluate(new_seq);
        if (v < bestv) { bestv = v, seq = new_seq; };
      }
    }
    return seq;
  }

  private swap_seq(seq, p0, p1, q0, q1) {
    let seq1 = seq.slice(0, p0);
    let seq2 = seq.slice(p1 + 1, q1);
    seq2.push(seq[p0]);
    seq2.push(seq[p1]);
    let seq3 = seq.slice(q1, seq.length);
    return seq1.concat(seq2).concat(seq3);
  }

  private doMutate(seq) {
    this.mutationTimes++;
    // m and n refers to the actual index in the array
    // m range from 0 to length-2, n range from 2...length-m
    let m, n;
    do {
      m = this.helpersService.randomNumber(seq.length - 2);
      n = this.helpersService.randomNumber(seq.length);
    } while (m >= n)

    for (let i = 0, j = (n - m + 1) >> 1; i < j; i++) {
      seq.swap(m + i, n - i);
    }
    return seq;
  }

  private pushMutate(seq) {
    this.mutationTimes++;
    let m, n;
    do {
      m = this.helpersService.randomNumber(seq.length >> 1);
      n = this.helpersService.randomNumber(seq.length);
    } while (m >= n)

    let s1 = seq.slice(0, m);
    let s2 = seq.slice(m, n)
    let s3 = seq.slice(n, seq.length);
    return s2.concat(s1).concat(s3).clone();
  }

  private setBestValue() {
    for (let i = 0; i < this.population.length; i++) {
      this.values[i] = this.evaluate(this.population[i]);
    }
    this.currentBest = this.getCurrentBest();
    if (this.bestValue === undefined || this.bestValue > this.currentBest.bestValue) {
      this.best = this.population[this.currentBest.bestPosition].clone();
      this.bestValue = this.currentBest.bestValue;
      this.UNCHANGED_GENS = 0;
    } else {
      this.UNCHANGED_GENS += 1;
    }
  }

  private getCurrentBest() {
    let bestP = 0;
    let currentBestValue = this.values[0];

    for (let i = 1; i < this.population.length; i++) {
      if (this.values[i] < currentBestValue) {
        currentBestValue = this.values[i];
        bestP = i;
      }
    }
    return {
      bestPosition: bestP,
      bestValue: currentBestValue
    }
  }

  private setRoulette() {
    //calculate all the fitness
    for (let i = 0; i < this.values.length; i++) { this.fitnessValues[i] = 1.0 / this.values[i]; }
    //set the roulette
    let sum = 0;
    for (let i = 0; i < this.fitnessValues.length; i++) { sum += this.fitnessValues[i]; }
    for (let i = 0; i < this.roulette.length; i++) { this.roulette[i] = this.fitnessValues[i] / sum; }
    for (let i = 1; i < this.roulette.length; i++) { this.roulette[i] += this.roulette[i - 1]; }
  }

  private wheelOut(rand) {
    let i;
    for (i = 0; i < this.roulette.length; i++) {
      if (rand <= this.roulette[i]) {
        return i;
      }
    }
  }

  private evaluate(indivial) {
    let sum = this.matrix[indivial[0]][indivial[indivial.length - 1]];
    for (let i = 1; i < indivial.length; i++) {
      sum += this.matrix[indivial[i]][indivial[i - 1]];
    }
    return sum;
  }
}
