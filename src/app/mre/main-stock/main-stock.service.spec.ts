import { TestBed } from '@angular/core/testing';

import { MainStockService } from './main-stock.service';

describe('MainStockService', () => {
  let service: MainStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
