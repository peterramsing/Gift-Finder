import { TestBed, inject } from '@angular/core/testing';

import { EbayService } from './ebay.service';

describe('EbayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EbayService]
    });
  });

  it('should be created', inject([EbayService], (service: EbayService) => {
    expect(service).toBeTruthy();
  }));
});
