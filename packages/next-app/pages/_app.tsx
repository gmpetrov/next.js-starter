import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';
import fetch from 'cross-fetch';
import { ApolloProvider } from '@apollo/react-common';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withRedux, { MakeStore, ReduxWrapperAppProps } from 'next-redux-wrapper';

import { constants, getStoreFromCtx, isSSR } from '@app/utils';
import { initStore } from '@app/store';

import '@app/style/style.scss';
import { AppStore } from '@app/store';
import { LOAD_STORE } from '@app/store/actions';

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    fetch,
    uri: constants.GRAPHQL_ENDPOINT,
    credentials: 'same-origin',
    headers: {
      // cookie: req.header('Cookie'),
    }
  }),
  cache: new InMemoryCache()
});

class MyApp extends App<ReduxWrapperAppProps<AppStore>> {
  static async getInitialProps({ Component, router, ctx }: any) {
    let pageProps: any = {};

    const loadedState = getStoreFromCtx(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps: {
        loadedState
      }
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    if (isSSR()) {
      store.dispatch({ type: LOAD_STORE, payload: pageProps.loadedState });
    }

    return (
      <>
        {/* <Head></Head> */}

        <Container>
          <Provider store={store}>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </Provider>
        </Container>
      </>
    );
  }
}

const makeStore: MakeStore = (initialState: AppStore, options) => {
  const store = getStoreFromCtx(options);

  return initStore(store || initialState);
};

export default withRedux(makeStore)(MyApp);
