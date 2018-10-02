import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import * as auth0 from "auth0-js";
import { CallbackComponent } from "./components/callback.component";
import { AUTH0_WEB_AUTH } from "./services/tokens";
import * as fromAuth from "./store";

export function auth0WebAuthFactory(): auth0.WebAuth {
  return new auth0.WebAuth({
    clientID: "gc3YpcUt64cC655TKbfiv9Pimon2c9V2",
    domain: "stottle.eu.auth0.com",
    responseType: "token id_token",
    redirectUri: "http://localhost:4200/callback",
    scope: "openid"
  });
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("auth", fromAuth.reducer),
    RouterModule.forChild([])
  ],
  declarations: [CallbackComponent],
  providers: [
    {
      provide: AUTH0_WEB_AUTH,
      useFactory: auth0WebAuthFactory
    }
  ]
})
export class AuthModule {}
