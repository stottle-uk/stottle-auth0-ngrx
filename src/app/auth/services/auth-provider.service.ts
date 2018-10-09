import { Inject, Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Observable, of, race, Subscriber, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Authentication } from '../store/auth.model';
import { AUTH0_LOGOUT_OPTIONS, AUTH0_WEB_AUTH } from './tokens';

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

  constructor(
    @Inject(AUTH0_WEB_AUTH) private auth0: auth0.WebAuth,
    @Inject(AUTH0_LOGOUT_OPTIONS) private logoutOptions: auth0.LogoutOptions
  ) {}

  login(options: auth0.AuthorizeOptions): void {
    this.auth0.authorize(options);
  }

  logout(options?: auth0.LogoutOptions): void {
    this.auth0.logout({
      ...this.logoutOptions,
      ...options
    });
  }

  handleAuthentication(): Observable<Authentication> {
    return new Observable<auth0.Auth0DecodedHash>(observer =>
      this.auth0.parseHash(this.authorisationCallback(observer))
    ).pipe(this.authorizationHandler());
  }

  renewAuthentication(): Observable<Authentication> {
    return new Observable<auth0.Auth0DecodedHash>(observer =>
      this.auth0.checkSession({}, this.authorisationCallback(observer))
    ).pipe(this.authorizationHandler());
  }

  scheduleRenewal(): Observable<Authentication> {
    const sessionTimer = timer(30 * 60000); // 30 minutes
    const sessionExpiryTimer = of(this.expiresAt).pipe(
      switchMap(expiresAt => timer(Math.max(1, +expiresAt - Date.now() - 1000)))
    );

    return race(sessionTimer, sessionExpiryTimer).pipe(switchMap(() => this.renewAuthentication()));
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

  private authorisationCallback(
    observer: Subscriber<auth0.Auth0DecodedHash>
  ): auth0.Auth0Callback<auth0.Auth0DecodedHash> {
    return (err, authResult: auth0.Auth0DecodedHash) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        observer.next(authResult);
        observer.complete();
      } else if (err) {
        observer.error(err);
      }
    };
  }

  private authorizationHandler(): (
    source: Observable<auth0.Auth0DecodedHash>
  ) => Observable<Authentication> {
    return source =>
      source.pipe(
        map(authResult => this.mapAuthenticationResult(authResult)),
        tap(mappedAuthResult => this.setSession(mappedAuthResult))
      );
  }

  private mapAuthenticationResult(authResult: auth0.Auth0DecodedHash): Authentication {
    return {
      ...authResult,
      expiresAt: JSON.stringify(new Date().getTime() + 15000), // JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime()),
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
