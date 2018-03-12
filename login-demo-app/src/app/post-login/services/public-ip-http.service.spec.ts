import { TestBed, inject } from '@angular/core/testing';

import { PublicIpHttpService } from './public-ip-http.service';

describe('PublicIpHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicIpHttpService]
    });
  });

  it('should be created', inject([PublicIpHttpService], (service: PublicIpHttpService) => {
    expect(service).toBeTruthy();
  }));
});
