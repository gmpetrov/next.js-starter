import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { gql } from 'apollo-boost';

import { LoginFormValues } from '@app/pages/login';
import { RegisterFormValues } from '@app/pages/register';
import { useActions } from '@app/hooks';
import { gqlMutationWrapper } from '@app/utils';

import {
  useLoginMutation,
  useRegisterMutation,
  LoginMutation,
  UsersPermissionsLoginPayload,
  UsersPermissionsLoginInput,
  UserInput
} from '@app/types/graphql';
import { AppStore } from './useStore';

const LOGIN = gql`
  mutation login($values: UsersPermissionsLoginInput!) {
    login(input: $values) {
      jwt
      user {
        email
      }
    }
  }
`;

const REGISTER = gql`
  mutation register($values: UserInput!) {
    register(input: $values) {
      jwt
      user {
        email
      }
    }
  }
`;

const selectAuth = () => {
  return useSelector(
    (state: AppStore) => ({
      auth: state.auth
    }),
    shallowEqual
  );
};

const useAuth = () => {
  const [handleLogin, loginState] = useLoginMutation();

  const [handleRegister, registerState] = useRegisterMutation();

  const { auth } = selectAuth();
  const { dispatchSetAuth, dispatchLogout } = useActions();

  // const setAuth = useStore(store => store.setAuth);
  // const reset = useStore(store => store.reset);

  const login = async (values: LoginFormValues) => {
    const { res, err } = await gqlMutationWrapper(handleLogin)({
      variables: {
        values: values as UsersPermissionsLoginInput
      }
    });
    if (res) {
      dispatchSetAuth(res.login as UsersPermissionsLoginPayload);
    }
    return {
      res,
      err
    };
  };

  const register = async (values: UserInput) => {
    const { res, err } = await gqlMutationWrapper(handleRegister)({
      variables: {
        values
      }
    });
    if (res) {
      dispatchSetAuth(res.register as UsersPermissionsLoginPayload);
    }
    return {
      res,
      err
    };
  };

  const logout = () => {
    dispatchLogout();
  };

  return {
    isAuthenticated: !!auth?.user,
    user: auth?.user,
    logout,
    login: {
      run: login,
      ...loginState
    },
    register: {
      run: register,
      ...registerState
    }
  };
};

export default useAuth;
