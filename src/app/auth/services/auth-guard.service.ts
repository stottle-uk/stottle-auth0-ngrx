import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fromAuth from '../store';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store
      .select(fromAuth.selectIsAuthenticated(new Date().getTime()))
      .pipe(tap(isAuthenticated => this.showLoginFormIfNotAuthenticated(isAuthenticated)));
  }

  private showLoginFormIfNotAuthenticated(isAuthenticated: boolean) {
    if (!isAuthenticated) {
      this.store.dispatch(new fromAuth.Login());
    }
  }
}
