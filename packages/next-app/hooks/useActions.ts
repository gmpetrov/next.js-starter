import { useDispatch } from 'react-redux';
import {
  SET_AUTH,
  SetAuthAction,
  LOGOUT,
  LOAD_STORE
} from '@app/store/actions';

const useActions = () => {
  const dispatch = useDispatch();

  const dispatchSetAuth = (payload: SetAuthAction['payload']) =>
    dispatch({ type: SET_AUTH, payload });

  const dispatchLogout = () => dispatch({ type: LOGOUT });

  const dispatchLoadStore = (payload: any) =>
    dispatch({ type: LOAD_STORE, payload });

  return { dispatchSetAuth, dispatchLogout, dispatchLoadStore };
};

export default useActions;
