import { TestBed } from '@angular/core/testing';

import { ExpenesesService } from './expeneses.service';

describe('ExpenesesService', () => {
  let service: ExpenesesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenesesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
