import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { BranchAndBoundService } from "app/tsp-opt/algorithms/branch-and-bound.service";

declare var Treant: any;

@Component({
  selector: 'app-treant-tree',
  templateUrl: './treant-tree.component.html',
  styleUrls: ['./treant-tree.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreantTreeComponent implements OnInit {

  constructor(private branchAndBoundService: BranchAndBoundService) {
  }

  config = {
    container: "#treant-id"
  };
  chart_config: any = [
    this.config
  ];

  ngOnInit() {
    this.branchAndBoundService.optimize([]).then(treantJsArr => {
      //this.tree_structure.nodeStructure = nodeStructure;
      console.log(this.chart_config.concat(treantJsArr));
      
      (() => { Treant(this.chart_config.concat(treantJsArr)) })();
    });
  }
}
