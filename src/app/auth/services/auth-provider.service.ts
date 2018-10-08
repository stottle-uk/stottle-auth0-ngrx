import { Inject, Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Observable } from 'rxjs';
import { Authentication } from '../store/auth.model';
import { AUTH0_WEB_AUTH } from './tokens';

@Injectable()
export class AuthProviderService {
  ACCESS_TOKEN = 'access_token';
  ID_TOKEN = 'id_token';
  EXPIRES_AT = 'expires_at';
  REDIRECT_URL = 'redirect_url';

  get accessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  set accessToken(accessToken: string) {
    this.addOrRemoveFromLocalStorage(this.ACCESS_TOKEN, accessToken);
  }

  get idToken(): string {
    return localStorage.getItem(this.ID_TOKEN);
  }

  set idToken(idToken: string) {
    this.addOrRemoveFromLocalStorage(this.ID_TOKEN, idToken);
  }

  get expiresAt(): string {
    return localStorage.getItem(this.EXPIRES_AT);
  }

  set expiresAt(expiresAt: string) {
    this.addOrRemoveFromLocalStorage(this.EXPIRES_AT, expiresAt);
  }

  get redirectUrl(): string {
    return localStorage.getItem(this.REDIRECT_URL);
  }

  set redirectUrl(url: string) {
    this.addOrRemoveFromLocalStorage(this.REDIRECT_URL, url);
  }

  constructor(@Inject(AUTH0_WEB_AUTH) private auth0: auth0.WebAuth) {}

  login(options: auth0.AuthorizeOptions): void {
    this.auth0.authorize(options);
  }

  handleAuthentication(): Observable<Authentication> {
    return new Observable<Authentication>(observer => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          const clientAuthResult: Authentication = {
            ...authResult,
            expiresAt: JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime()),
            redirectUrl: this.redirectUrl
          };
          this.setSession(clientAuthResult);
          observer.next(clientAuthResult);
          observer.complete();
        } else if (err) {
          observer.error(err);
        }
      });
    });
  }

  clearLocalStorage(): void {
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = null;
  }

  getAuthState(): Authentication {
    return {
      expiresAt: JSON.parse(this.expiresAt || '{}'),
      accessToken: this.accessToken,
      redirectUrl: this.redirectUrl
    };
  }

  private setSession(authResult: Authentication): void {
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = authResult.expiresAt;
  }

  private addOrRemoveFromLocalStorage(key: string, value: string) {
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  }
}
