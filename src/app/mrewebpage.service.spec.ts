import { TestBed } from '@angular/core/testing';

import { MrewebpageService } from './mrewebpage.service';

describe('MrewebpageService', () => {
  let service: MrewebpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrewebpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
