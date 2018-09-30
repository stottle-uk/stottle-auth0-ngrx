import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CallbackComponent } from './auth/components/callback.component';
import { AuthProviderService } from './auth/services/auth-provider.service';
import { HomeComponent } from './home/components/home.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, RouterModule.forRoot(ROUTES), AuthModule],
  providers: [AuthProviderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
