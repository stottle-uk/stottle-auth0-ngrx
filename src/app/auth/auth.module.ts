import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as auth0 from "auth0-js";
import { AUTH0_WEB_AUTH } from "./services/tokens";
import { RouterModule } from "@angular/router";
import { CallbackComponent } from "./components/callback/callback.component";

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
  imports: [CommonModule, RouterModule.forChild([])],
  declarations: [CallbackComponent],
  providers: [
    {
      provide: AUTH0_WEB_AUTH,
      useFactory: auth0WebAuthFactory
    }
  ]
})
export class AuthModule {}
