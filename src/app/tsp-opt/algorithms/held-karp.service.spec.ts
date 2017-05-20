import { TestBed, inject } from '@angular/core/testing';

import { HeldKarpService } from './held-karp.service';

describe('HeldKarpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeldKarpService]
    });
  });

  it('should ...', inject([HeldKarpService], (service: HeldKarpService) => {
    expect(service).toBeTruthy();
  }));
});
