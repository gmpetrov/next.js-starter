import {
  LOGOUT,
  SET_AUTH,
  AuthActionTypes,
  LOAD_STORE
} from '@app/store/actions';
import { UsersPermissionsLoginPayload } from '@app/types/graphql';

const initialState = null;

const authReducer = (
  state = initialState,
  action: AuthActionTypes
): UsersPermissionsLoginPayload | null => {
  switch (action.type) {
    case LOAD_STORE:
      return { ...(action.payload?.auth || initialState) };
    case SET_AUTH:
      return {
        ...action.payload
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
