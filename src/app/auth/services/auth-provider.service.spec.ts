import { TestBed } from '@angular/core/testing';

import { AuthProviderService } from './auth-provider.service';

describe('AuthProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthProviderService = TestBed.get(AuthProviderService);
    expect(service).toBeTruthy();
  });
});
