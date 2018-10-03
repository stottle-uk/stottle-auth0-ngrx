import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as auth0 from 'auth0-js';
import { AuthRoutesModule } from './auth-routes.moduls';
import { CallbackComponent } from './components/callback.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthProviderService } from './services/auth-provider.service';
import { AUTH0_WEB_AUTH } from './services/tokens';
import * as fromAuth from './store';
import { AuthEffects } from './store/auth.effects';

export function auth0WebAuthFactory(): auth0.WebAuth {
  return new auth0.WebAuth({
    clientID: 'gc3YpcUt64cC655TKbfiv9Pimon2c9V2',
    domain: 'stottle.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid'
  });
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    AuthRoutesModule
  ],
  declarations: [CallbackComponent],
  providers: [
    {
      provide: AUTH0_WEB_AUTH,
      useFactory: auth0WebAuthFactory
    },
    AuthProviderService,
    AuthGuardService
  ]
})
export class AuthModule {}
