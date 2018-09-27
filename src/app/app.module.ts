import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AuthProviderService } from "./auth/services/auth-provider.service";
import { AuthModule } from "./auth/auth.module";
import { RouterModule, Routes } from "@angular/router";
import { CallbackComponent } from "./auth/components/callback/callback.component";
import { HomeComponent } from "./home/components/home/home.component";

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "callback", component: CallbackComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, RouterModule.forRoot(ROUTES), AuthModule],
  providers: [AuthProviderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
