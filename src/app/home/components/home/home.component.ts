import { Component, OnInit } from "@angular/core";
import { AuthProviderService } from "../../../auth/services/auth-provider.service";

@Component({
  selector: "stottle-home",
  template: `
  <button type="button" (click)="login()">login</button>
  `,
  styles: []
})
export class HomeComponent {
  constructor(private auth: AuthProviderService) {}

  login(): void {
    this.auth.login();
  }
}
