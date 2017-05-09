import { TestBed, inject } from '@angular/core/testing';

import { GMapCalculationsService } from './gmap-calculations.service';

describe('GMapCalculationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GMapCalculationsService]
    });
  });

  it('should ...', inject([GMapCalculationsService], (service: GMapCalculationsService) => {
    expect(service).toBeTruthy();
  }));
});
