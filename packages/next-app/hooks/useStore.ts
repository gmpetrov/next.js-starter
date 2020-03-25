import React, { useEffect } from 'react';
import create, { UseStore, StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import Cookie from 'js-cookie';
import {
  UsersPermissionsLoginPayload,
  UsersPermissionsMe
} from '@app/types/graphql';
import { constants, getCookie, isSSR } from '@app/utils';
import { NextPageContext } from 'next';

export interface StoreReducers {
  setAuth: (payload: UsersPermissionsLoginPayload) => void;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  reset: () => void;
  loadStore: (store: AppStore) => Promise<void>;
}

export interface StoreState {
  auth?: UsersPermissionsLoginPayload;
}
export interface AppStore extends StoreReducers, StoreState {}

const initialState: StoreState = {
  auth: undefined
};

interface OwnProps {
  store?: AppStore;
  children: any;
}

export const StoreProvider: React.FC<OwnProps> = ({
  children,
  store,
  ...otherProps
}) => {
  // const loadStore = useStore(store => store.loadStore);

  // useEffect(() => {
  //   if (store) {
  //     loadStore(store);
  //   }
  // }, []);

  return React.cloneElement(children, { ...otherProps });
};

const persist = (config: any) => (set: any, get: any, api: any) => {
  return config(
    (args: any) => {
      set(args);

      Cookie.set(constants.COOKIE_APP_STORE, JSON.stringify(get()));
    },
    get,
    api
  );
};

export const initializeStore = (preloadedState = initialState) => {
  return create<AppStore>(
    persist(
      devtools((set: any) => ({
        ...preloadedState,
        setAuth: (payload: UsersPermissionsLoginPayload) =>
          set({ auth: payload }, 'setAuth'),
        reset: () =>
          set(
            {
              ...initialState
            },
            'reset'
          ),
        loadStore: (nextStore: AppStore) => {
          console.log('NEXT STORE', nextStore);
          // if (loadedStore) {
          //   // SSR

          //   set({ ...loadedStore }, 'loadStore');
          // } else {
          // BROWSER
          // const item = getCookie(constants.COOKIE_APP_STORE);
          // const store: AppStore | undefined = item && JSON.parse(item);
          set({ ...nextStore }, 'loadStore');
          // }
        }
        // loadStore: (loadedStore?: AppStore) => {
        //   if (loadedStore) {
        //     // SSR

        //     set({ ...loadedStore }, 'loadStore');
        //   } else {
        //     // BROWSER
        //     const item = getCookie(constants.COOKIE_APP_STORE);
        //     const store: AppStore | undefined = item && JSON.parse(item);
        //     set({ ...store }, 'loadStore');
        //   }
        // }
      }))
    )
  );
};

let zustandStore:
  | [UseStore<AppStore>, StoreApi<AppStore>]
  | undefined = undefined;

export const getZustand = (initialState?: AppStore) => {
  console.log('CALLED ==========>');
  if (isSSR()) {
    return initializeStore(initialState);
  }

  if (!zustandStore) {
    zustandStore = initializeStore(initialState);
  }

  return zustandStore;
};

// const [useStore] = create<AppStore>(
//   persist(
//     devtools((set: any) => ({
//       ...initialState,
//       setAuth: (payload: UsersPermissionsLoginPayload) =>
//         set({ auth: payload }, 'setAuth'),
//       reset: () =>
//         set(
//           {
//             ...initialState
//           },
//           'reset'
//         ),
//       loadStore: (loadedStore?: AppStore) => {
//         if (loadedStore) {
//           // SSR

//           set({ ...loadedStore }, 'loadStore');
//         } else {
//           // BROWSER
//           const item = getCookie(constants.COOKIE_APP_STORE);
//           const store: AppStore | undefined = item && JSON.parse(item);
//           set({ ...store }, 'loadStore');
//         }
//       }
//     }))
//   )
// );

export const [useStore] = getZustand();
