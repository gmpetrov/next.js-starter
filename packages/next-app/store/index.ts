import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Cookie from 'js-cookie';

import reducers from './reducers';

import { constants } from '@app/utils';

export type AppStore = ReturnType<typeof reducers>;

const persist = (store: any) => (next: any) => (action: any) => {
  const result = next(action);

  Cookie.set(constants.COOKIE_APP_STORE, JSON.stringify(store.getState()));

  return result;
};

export const initStore = (preloadedState = {}) => {
  return createStore(
    reducers,
    preloadedState,
    composeWithDevTools(applyMiddleware(persist))
  );
};
