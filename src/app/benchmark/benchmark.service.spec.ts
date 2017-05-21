import { TestBed, inject } from '@angular/core/testing';

import { BenchmarkService } from './benchmark.service';

describe('BenchmarkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BenchmarkService]
    });
  });

  it('should ...', inject([BenchmarkService], (service: BenchmarkService) => {
    expect(service).toBeTruthy();
  }));
});
