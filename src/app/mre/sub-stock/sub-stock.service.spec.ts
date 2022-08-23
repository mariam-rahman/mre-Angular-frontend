import { TestBed } from '@angular/core/testing';

import { SubStockService } from './sub-stock.service';

describe('SubStockService', () => {
  let service: SubStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
