import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../auth/store';

@Component({
  selector: 'stottle-home',
  template: `
  <button type="button" (click)="login()">login</button>
  `,
  styles: []
})
export class HomeComponent {
  constructor(private store: Store<fromAuth.State>) {}

  login(): void {
    this.store.dispatch(new fromAuth.Login());
  }

  logout(): void {
    this.store.dispatch(new fromAuth.Logout());
  }
}
