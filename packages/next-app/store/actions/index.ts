import { UsersPermissionsLoginPayload } from '@app/types/graphql';

export const SET_AUTH = 'SET_AUTH';
export const LOGOUT = 'LOGOUT';
export const LOAD_STORE = 'LOAD_STORE';

export interface SetAuthAction {
  type: typeof SET_AUTH;
  payload: UsersPermissionsLoginPayload;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}
export interface LoadStoreAction {
  type: typeof LOAD_STORE;
  payload: any;
}

export type AuthActionTypes = SetAuthAction | LogoutAction | LoadStoreAction;
