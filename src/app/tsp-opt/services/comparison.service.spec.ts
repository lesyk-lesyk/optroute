import { TestBed, inject } from '@angular/core/testing';

import { ComparisonService } from './comparison.service';

describe('ComparisonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComparisonService]
    });
  });

  it('should ...', inject([ComparisonService], (service: ComparisonService) => {
    expect(service).toBeTruthy();
  }));
});
