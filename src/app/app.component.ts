import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthProviderService } from "./auth/services/auth-provider.service";
import * as fromAuth from "./auth/store";
import { map } from "rxjs/operators";
import { Auth } from "./auth/store/auth.model";

@Component({
  selector: "stottle-root",
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <h1>
        Welcome to {{title}}!
      </h1>
      <img width="300" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <h2>Here are some links to help you start: </h2>
    <ul>
      <li>
        <h2><a routerLink="/">THome</a></h2>
      </li>

    </ul>

    <main role="main" class="container">
      <router-outlet></router-outlet>
    </main>
    
  `,
  styles: []
})
export class AppComponent {
  title = "stottle-auth0-ngrx";

  constructor(
    public auth: AuthProviderService,
    private store: Store<fromAuth.State>
  ) {}

  ngOnInit() {
    this.auth
      .handleAuthentication()
      .subscribe(auth =>
        this.store.dispatch(new fromAuth.HandleAuthentication({ auth }))
      );
  }
}
