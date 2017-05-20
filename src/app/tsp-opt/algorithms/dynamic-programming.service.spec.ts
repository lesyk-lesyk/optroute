import { TestBed, inject } from '@angular/core/testing';

import { DynamicProgrammingService } from './dynamic-programming.service';

describe('DynamicProgrammingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicProgrammingService]
    });
  });

  it('should ...', inject([DynamicProgrammingService], (service: DynamicProgrammingService) => {
    expect(service).toBeTruthy();
  }));
});
