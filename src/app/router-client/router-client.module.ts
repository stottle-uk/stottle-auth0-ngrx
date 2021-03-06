import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromRouter from './store';
import { RouterEffects } from './store/router.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('router', fromRouter.routerReducer),
    EffectsModule.forFeature([RouterEffects])
  ],
  declarations: []
})
export class RouterClientModule {}
