import { TestBed } from '@angular/core/testing';

import { WebCategoryService } from './web-category.service';

describe('WebCategoryService', () => {
  let service: WebCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
