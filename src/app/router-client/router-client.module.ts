import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  imports: [CommonModule, StoreRouterConnectingModule.forRoot({ stateKey: 'router' })],
  declarations: []
})
export class RouterClientModule {}
