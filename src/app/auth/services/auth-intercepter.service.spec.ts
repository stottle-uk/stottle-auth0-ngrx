import { TestBed } from '@angular/core/testing';

import { AuthIntercepterService } from './auth-intercepter.service';

describe('AuthIntercepterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthIntercepterService = TestBed.get(AuthIntercepterService);
    expect(service).toBeTruthy();
  });
});
