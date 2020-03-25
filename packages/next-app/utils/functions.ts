import * as R from 'ramda';
import { MutationFunctionOptions, ExecutionResult } from '@apollo/react-common';
import Cookie from 'js-cookie';
import { NextPageContext } from 'next';

import { AppStore } from '@app/store';
import { constants } from '@app/utils';
import jwtDecode from 'jwt-decode';

export interface GqlFetchWrapperOutput<T> {
  res: T | undefined;
  err: any;
}

export type GqlMutationWrapperArg<T, V> = (
  options?: MutationFunctionOptions<T, V> | undefined
) => Promise<ExecutionResult<T>>;

export const gqlMutationWrapper = <T, V>(
  fn: GqlMutationWrapperArg<T, V>
) => async (
  args: MutationFunctionOptions<T, V>
): Promise<GqlFetchWrapperOutput<T>> => {
  try {
    const { data } = await fn(args);

    return {
      res: data,
      err: undefined
    };
  } catch (err) {
    return {
      err,
      res: undefined
    };
  }
};

export const gqlFetch = <T, V>(fn: GqlMutationWrapperArg<T, V>) => (
  args: MutationFunctionOptions<T, V>
) => async (key: string): Promise<GqlFetchWrapperOutput<T>> => {
  const { res, err } = await gqlMutationWrapper(fn)(args);

  return {
    res: res && (res as any)[key],
    err
  };
};

export const isSSR = () => !process.browser;

export const storageSetItem = (key: string) => (data: any) => {
  if (isSSR()) {
    return;
  }

  const value = typeof data == 'string' ? data : JSON.stringify(data);

  window.localStorage.setItem(key, value);
};

export const storageGetItem = <T>(key: string): T | undefined => {
  if (isSSR()) {
    return;
  }

  const str = window.localStorage.getItem(key);
  return str && JSON.parse(str);
};

export const setCookie = (key: string) => (data: string) => {
  return Cookie.set(key, data);
};

export const getCookie = (key: string, ctx?: NextPageContext) => {
  if (isSSR() && ctx) {
    return R.path(['req', 'cookies', key])(ctx) as string;
  }

  return Cookie.get(key);
};

export const getStoreFromCtx = (ctx: NextPageContext): AppStore | undefined => {
  const storeCookie = getCookie(constants.COOKIE_APP_STORE, ctx);

  return JSON.parse(storeCookie || '{}');
};

export const checkJwtExpired = (token: string) => {
  try {
    const parsed = jwtDecode<{ exp: number }>(token);

    return Date.now() >= parsed.exp * 1000;
  } catch (err) {}

  return true;
};

export const checkIsAuthenticatedRequest = (ctx: NextPageContext) => {
  try {
    const store = getStoreFromCtx(ctx);
    const token = R.path<string>(['auth', 'jwt'])(store);

    if (token) {
      return !checkJwtExpired(token);
    }
  } catch (err) {
    console.log('checkIsAuthenticatedRequest', err);
  }

  return false;
};

export const authenticateOrRedirect = (ctx: NextPageContext) => {
  const isAuthenticated = checkIsAuthenticatedRequest(ctx);

  if (!isAuthenticated) {
    ctx.res?.writeHead(301, {
      Location: constants.ROUTES.LOGIN
    });
    ctx.res?.end();
  }
};

// export const ssrGetStore = async (ctx: NextPageContext) => {
//   const isAuthenticated = checkIsAuthenticatedRequest(ctx);

//   if (!isAuthenticated) {
//     ctx.res?.writeHead(301, {
//       Location: constants.ROUTES.LOGIN
//     });
//     ctx.res?.end();
//   }

//   return getStoreFromCtx(ctx);
// };
