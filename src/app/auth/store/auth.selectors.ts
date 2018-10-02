import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getAuth, getError, State } from './auth.reducer';

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectAuth = createSelector(selectAuthState, getAuth);

export const selectError = createSelector(selectAuthState, getError);
