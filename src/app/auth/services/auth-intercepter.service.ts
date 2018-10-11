import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import * as fromAuth from '../store';

@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService {
  constructor(private store: Store<fromAuth.State>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(fromAuth.selectIsAuthenticated(new Date().getTime())).pipe(
      withLatestFrom(this.store.select(fromAuth.selectAuth)),
      tap(console.log),
      map(([isAuthenticated, auth]) => {
        return isAuthenticated && auth.accessToken
          ? req.clone({
              headers: req.headers.set('Authorization', `Bearer ${auth.accessToken}`)
            })
          : req;
      }),
      mergeMap(req => next.handle(req))
    );
  }
}
