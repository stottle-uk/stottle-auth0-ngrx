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
    <button type="button" (click)="login()">login</button>
    <button type="button" (click)="logout()">logout</button>
  </div>

  <main role="main" class="container">
    <router-outlet></router-outlet>
  </main>
  `,
  styles: []
})
export class AppComponent {
  title = 'stottle-auth0-ngrx';

  constructor(private store: Store<fromAuth.State>) {}

  login(): void {
    this.store.dispatch(new fromAuth.Login());
  }

  logout(): void {
    this.store.dispatch(new fromAuth.Logout());
  }
}
