import { TestBed, inject } from '@angular/core/testing';

import { TspOptService } from './tsp-opt.service';

describe('TspOptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TspOptService]
    });
  });

  it('should ...', inject([TspOptService], (service: TspOptService) => {
    expect(service).toBeTruthy();
  }));
});
