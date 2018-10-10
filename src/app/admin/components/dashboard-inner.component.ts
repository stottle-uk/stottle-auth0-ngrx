import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'stottle-dashboard-inner',
  template: `
  <h1>Admin</h1>
  <pre>{{userInfo | json}}</pre>

  <input type="email" placeholder="email address" [(ngModel)]="emailAddress" name="emailAddress"/>
  <button type="button" (click)="submitEmailAddress()">Password Change</button>
  <p>{{changePasswordResponse}}</p>
  `,
  styles: []
})
export class DashboardInnerComponent {
  @Input()
  userInfo: auth0.Auth0UserProfile;
  @Input()
  changePasswordResponse: string;
  @Output()
  emailAddressSubmitted = new EventEmitter<string>();

  emailAddress: string;

  submitEmailAddress(): void {
    this.emailAddressSubmitted.emit(this.emailAddress);
  }
}
