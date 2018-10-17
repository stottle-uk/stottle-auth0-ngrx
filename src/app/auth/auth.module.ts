import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as auth0 from 'auth0-js';
import { AuthRoutesModule } from './auth-routes.moduls';
import { CallbackComponent } from './components/callback.component';
import { AuthDatesService } from './services/auth-dates.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthIntercepterService } from './services/auth-intercepter.service';
import { AuthProviderService } from './services/auth-provider.service';
import { AUTH0_LOGOUT_OPTIONS, AUTH0_WEB_AUTH } from './services/tokens';
import * as fromAuth from './store';
import { AuthEffects } from './store/auth.effects';

export function auth0WebAuthFactory(options: auth0.AuthOptions): () => auth0.WebAuth {
  return () => new auth0.WebAuth(options);
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    AuthRoutesModule
  ],
  declarations: [CallbackComponent]
})
export class AuthModule {
  static forRoot(
    options: auth0.AuthOptions,
    logoutOptions: auth0.LogoutOptions
  ): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH0_WEB_AUTH,
          useFactory: auth0WebAuthFactory(options)
        },
        {
          provide: AUTH0_LOGOUT_OPTIONS,
          useValue: logoutOptions
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthIntercepterService,
          multi: true
        },
        AuthDatesService,
        AuthGuardService,
        AuthProviderService
      ]
    };
  }
}
