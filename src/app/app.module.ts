import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutesModule } from './app-routes.moduls';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthProviderService } from './auth/services/auth-provider.service';
import { HomeComponent } from './home/components/home.component';
import { RouterClientModule } from './router-client/router-client.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AuthModule,
    RouterClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument({ name: 'ngrx-auth0-example' }),
    AppRoutesModule
  ],
  providers: [AuthProviderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
