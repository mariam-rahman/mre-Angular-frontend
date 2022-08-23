import { TestBed } from '@angular/core/testing';

import { WebproductService } from './webproduct.service';

describe('WebproductService', () => {
  let service: WebproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
