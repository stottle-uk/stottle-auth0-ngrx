import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CallbackComponent } from './auth/components/callback.component';
import { AuthProviderService } from './auth/services/auth-provider.service';
import { HomeComponent } from './home/components/home.component';
import { RouterClientModule } from './router-client/router-client.module';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(
      {},
      {
        // metaReducers: metaReducers,
        // initialState: {
        //   router: {
        //     state: {
        //       url: '/',
        //       params: {},
        //       queryParams: {}
        //     },
        //     navigationId: 0
        //   }
        // }
      }
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ name: 'ngrx-auth0-example' }),
    RouterClientModule,
    RouterModule.forRoot(ROUTES),
    AuthModule
  ],
  providers: [AuthProviderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
