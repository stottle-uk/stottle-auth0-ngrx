import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('router', fromRouter.routerReducer),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
  ],
  declarations: []
})
export class RouterClientModule {}
