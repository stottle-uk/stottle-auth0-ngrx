import { TestBed } from '@angular/core/testing';
import * as auth0 from 'auth0-js';
import { AuthDatesService } from './auth-dates.service';
import { AuthProviderService } from './auth-provider.service';
import { AUTH0_LOGOUT_OPTIONS, AUTH0_WEB_AUTH } from './tokens';

const webAuth = new auth0.WebAuth({
  clientID: '',
  domain: ''
});

const mockDates: AuthDatesService = {
  getTime: () => 1000
};

fdescribe('AuthProviderService', () => {
  let service: AuthProviderService;
  let authProvider: auth0.WebAuth;

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
        },
        {
          provide: AuthDatesService,
          useValue: mockDates
        }
      ]
    }));

  beforeEach(() => {
    service = TestBed.get(AuthProviderService);
    authProvider = TestBed.get(AUTH0_WEB_AUTH);
  });

  it('should authorize', () => {
    authProvider.authorize = jasmine.createSpy('authorize');

    service.authorize({
      mode: 'signUp'
    });

    expect(authProvider.authorize).toHaveBeenCalledWith({
      mode: 'signUp'
    });
  });

  it('should handle Authentication', () => {
    authProvider.parseHash = jasmine.createSpy('parseHash').and.callFake(callback =>
      callback('error', {
        accessToken: 'accessToken',
        idToken: 'idToken',
        expiresIn: '1'
      })
    );

    service.handleAuthentication().subscribe(value => {
      expect(authProvider.parseHash).toHaveBeenCalled();
      expect(value.accessToken).toBe('accessToken');
      expect(value.idToken).toBe('idToken');
      expect(value.expiresAt).toBe('2000');
    });
  });

  it('should check session', () => {
    authProvider.checkSession = jasmine.createSpy('parseHash').and.callFake((options, callback) =>
      callback('error', {
        accessToken: 'accessToken',
        idToken: 'idToken',
        expiresIn: '1'
      })
    );

    service.checkSession().subscribe(value => {
      expect(authProvider.checkSession).toHaveBeenCalled();
      expect(value.accessToken).toBe('accessToken');
      expect(value.idToken).toBe('idToken');
      expect(value.expiresAt).toBe('2000');
    });
  });

  it('should change password', () => {
    authProvider.changePassword = jasmine
      .createSpy('parseHash')
      .and.callFake((options, callback) => callback('error', 'password change requested'));

    service
      .changePassword({
        connection: 'db',
        email: 'emai@test.com'
      })
      .subscribe(value => {
        expect(authProvider.changePassword).toHaveBeenCalled();
        expect(value).toBe('password change requested');
      });
  });
});
