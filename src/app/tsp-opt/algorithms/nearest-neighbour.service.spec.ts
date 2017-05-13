import { TestBed, inject } from '@angular/core/testing';

import { NearestNeighbourService } from './nearest-neighbour.service';

describe('NearestNeighbourService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NearestNeighbourService]
    });
  });

  it('should ...', inject([NearestNeighbourService], (service: NearestNeighbourService) => {
    expect(service).toBeTruthy();
  }));
});
