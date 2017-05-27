export interface OptimisationResult {
  /**
   * Array with order of visiting cities starts from zero to last city
   */
  order: number[];

  /**
   * Cost of path based of cost matrix
   */
  cost: number;

  /**
   * Algorithm name
   */
  name: string;

  searchTime: number;
}
