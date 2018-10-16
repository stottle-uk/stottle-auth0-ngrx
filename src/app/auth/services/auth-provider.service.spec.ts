import { TestBed } from '@angular/core/testing';
import * as auth0 from 'auth0-js';
import { AuthProviderService } from './auth-provider.service';
import { AUTH0_LOGOUT_OPTIONS, AUTH0_WEB_AUTH } from './tokens';

const webAuth = new auth0.WebAuth({
  clientID: '',
  domain: ''
});

describe('AuthProviderService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        AuthProviderService,
        {
          provide: AUTH0_WEB_AUTH,
          useValue: webAuth
        },
        {
          provide: AUTH0_LOGOUT_OPTIONS,
          useValue: {}
        }
      ]
    }));

  it('should be created', () => {
    const service: AuthProviderService = TestBed.get(AuthProviderService);
    const authProvider: AuthProviderService = TestBed.get(AUTH0_WEB_AUTH);
    authProvider.authorize = jasmine.createSpy('');

    service.authorize({
      mode: 'signUp'
    });

    expect(authProvider.authorize).toHaveBeenCalledWith({
      mode: 'signUp'
    });
  });
});
