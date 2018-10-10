import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutesModule } from './app-routes.moduls';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/components/home.component';
import { RouterClientModule } from './router-client/router-client.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AuthModule.forRoot(
      {
        clientID: 'gc3YpcUt64cC655TKbfiv9Pimon2c9V2',
        domain: 'stottle.eu.auth0.com',
        responseType: 'token id_token',
        redirectUri: 'http://localhost:4200/callback',
        scope: 'openid profile email',
        audience: 'http://localhost:8004'
      },
      {
        returnTo: 'http://localhost:4200'
      }
    ),
    RouterClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument({ name: 'ngrx-auth0-example' }),
    AppRoutesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
