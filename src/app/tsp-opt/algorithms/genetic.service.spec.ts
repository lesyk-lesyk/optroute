import { TestBed, inject } from '@angular/core/testing';

import { GeneticService } from './genetic.service';

describe('GeneticService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneticService]
    });
  });

  it('should ...', inject([GeneticService], (service: GeneticService) => {
    expect(service).toBeTruthy();
  }));
});
