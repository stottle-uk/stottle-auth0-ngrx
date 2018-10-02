import { Inject, Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Observable } from 'rxjs';
import { Auth } from '../store/auth.model';
import { AUTH0_WEB_AUTH } from './tokens';

@Injectable()
export class AuthProviderService {
  constructor(@Inject(AUTH0_WEB_AUTH) private auth0: auth0.WebAuth) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): Observable<Auth> {
    return new Observable<Auth>(observer => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          const authResultWithExpiresAt = {
            ...authResult,
            expiresAt: JSON.stringify(
              authResult.expiresIn * 1000 + new Date().getTime()
            )
          };
          this.setSession(authResultWithExpiresAt);
          observer.next(authResultWithExpiresAt);
          observer.complete();
        } else if (err) {
          observer.error(err);
        }
      });
    });
  }

  private setSession(authResult: Auth): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', authResult.expiresAt);
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }
}
