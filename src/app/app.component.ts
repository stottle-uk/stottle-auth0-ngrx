import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from './auth/store';

@Component({
  selector: 'stottle-root',
  template: `
  <div style="text-align:center">
    <h1>
      Welcome to {{title}}!
    </h1>
    <button type="button" (click)="login()" *ngIf="!(isAuthenticated$ | async)">login</button>
    <button type="button" (click)="logout()" *ngIf="(isAuthenticated$ | async)">logout</button>
  </div>

  <main role="main" class="container">
    <router-outlet></router-outlet>
  </main>
  `,
  styles: []
})
export class AppComponent {
  title = 'stottle-auth0-ngrx';

  isAuthenticated$ = this.store.select(fromAuth.selectIsAuthenticated(new Date().getTime()));

  constructor(private store: Store<fromAuth.State>) {}

  login(): void {
    this.store.dispatch(
      new fromAuth.Login({
        redirectUrl: '/',
        options: {
          mode: 'login'
        }
      })
    );
  }

  logout(): void {
    this.store.dispatch(new fromAuth.Logout());
  }
}
