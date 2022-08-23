import { TestBed } from '@angular/core/testing';

import { OnSaleService } from './on-sale.service';

describe('OnSaleService', () => {
  let service: OnSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
