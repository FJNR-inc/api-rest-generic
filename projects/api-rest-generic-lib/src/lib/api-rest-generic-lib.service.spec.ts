import { TestBed } from '@angular/core/testing';

import { ApiRestGenericLibService } from './api-rest-generic-lib.service';

describe('ApiRestGenericLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiRestGenericLibService = TestBed.get(ApiRestGenericLibService);
    expect(service).toBeTruthy();
  });
});
