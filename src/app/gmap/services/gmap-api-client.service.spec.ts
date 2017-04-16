import { TestBed, inject } from '@angular/core/testing';

import { GMapApiClientService } from './gmap-api-client.service';

describe('GMapApiClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GMapApiClientService]
    });
  });

  it('should ...', inject([GMapApiClientService], (service: GMapApiClientService) => {
    expect(service).toBeTruthy();
  }));
});
