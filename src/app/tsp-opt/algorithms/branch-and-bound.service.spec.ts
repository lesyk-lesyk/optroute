import { TestBed, inject } from '@angular/core/testing';

import { BranchAndBoundService } from './branch-and-bound.service';

describe('BranchAndBoundService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchAndBoundService]
    });
  });

  it('should ...', inject([BranchAndBoundService], (service: BranchAndBoundService) => {
    expect(service).toBeTruthy();
  }));
});
