import { TestBed, inject } from '@angular/core/testing';

import { BruteForceService } from './brute-force.service';

describe('BruteForceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BruteForceService]
    });
  });

  it('should ...', inject([BruteForceService], (service: BruteForceService) => {
    expect(service).toBeTruthy();
  }));
});
