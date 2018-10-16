import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as auth0 from 'auth0-js';
import { Observable } from 'rxjs';
import { AuthProviderService } from '../services/auth-provider.service';
import { AUTH0_LOGOUT_OPTIONS, AUTH0_WEB_AUTH } from '../services/tokens';
import { AuthEffects } from './auth.effects';

const webAuth = new auth0.WebAuth({
  clientID: '',
  domain: ''
});

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        AuthProviderService,
        {
          provide: AUTH0_WEB_AUTH,
          useValue: webAuth
        },
        {
          provide: AUTH0_LOGOUT_OPTIONS,
          useValue: {}
        },
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
