import { Inject, Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Observable, of, race, Subscriber, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Authentication } from '../store/auth.model';
import { AUTH0_LOGOUT_OPTIONS, AUTH0_WEB_AUTH } from './tokens';

@Injectable()
export class AuthProviderService {
  ACCESS_TOKEN = 'stottle::access_token';
  ID_TOKEN = 'stottle::id_token';
  EXPIRES_AT = 'stottle::expires_at';
  REDIRECT_URL = 'stottle::redirect_url';

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

  authorize(options: auth0.AuthorizeOptions): void {
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

  checkSession(): Observable<Authentication> {
    return new Observable<auth0.Auth0DecodedHash>(observer =>
      this.auth0.checkSession({}, this.authorisationCallback(observer))
    ).pipe(this.authorizationHandler());
  }

  changePassword(options: auth0.ChangePasswordOptions): Observable<string> {
    return new Observable<string>(observer =>
      this.auth0.changePassword(options, this.changePasswordCallback(observer))
    );
  }

  getUserInfo(): Observable<auth0.Auth0UserProfile> {
    return new Observable<auth0.Auth0UserProfile>(observer =>
      this.auth0.client.userInfo(this.accessToken, this.userInfoCallback(observer))
    );
  }

  scheduleSessionCheck(): Observable<number> {
    const sessionTimer = timer(30 * 60000); // 30 minutes
    const sessionExpiryTimer = of(this.expiresAt).pipe(
      switchMap(expiresAt => timer(Math.max(1, +expiresAt - Date.now() - 1000)))
    );

    return race(sessionTimer, sessionExpiryTimer);
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

  private changePasswordCallback(observer: Subscriber<string>): auth0.Auth0Callback<string> {
    return (err, response: string) => {
      if (response) {
        observer.next(response);
        observer.complete();
      } else if (err) {
        observer.error(err);
      }
    };
  }

  private userInfoCallback(
    observer: Subscriber<auth0.Auth0UserProfile>
  ): auth0.Auth0Callback<auth0.Auth0UserProfile> {
    return (err, userInfo: auth0.Auth0UserProfile) => {
      if (userInfo) {
        observer.next(userInfo);
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
        map(authResult => this.mapToAuthemticationState(authResult)),
        tap(mappedAuthResult => this.setSession(mappedAuthResult))
      );
  }

  private mapToAuthemticationState(authResult: auth0.Auth0DecodedHash): Authentication {
    return {
      ...authResult,
      expiresAt: JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime()),
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
