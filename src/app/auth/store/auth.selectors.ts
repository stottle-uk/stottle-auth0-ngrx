import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getAuth, getChangePasswordResponse, getError, getUserInfo, State } from './auth.reducer';

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectAuth = createSelector(selectAuthState, getAuth);

export const selectUserInfo = createSelector(selectAuthState, getUserInfo);

export const selectChangePasswordResponse = createSelector(
  selectAuthState,
  getChangePasswordResponse
);

export const selectError = createSelector(selectAuthState, getError);

export const selectIsAuthenticated = (time: number) =>
  createSelector(
    selectAuth,
    auth => auth && !!auth.accessToken && !!auth.expiresAt && time < +auth.expiresAt
  );
