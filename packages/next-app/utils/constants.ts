import getConfig from 'next/config';

const {
  publicRuntimeConfig: { GRAPHQL_ENDPOINT }
} = getConfig();

const CONFIG = {
  APP_NAME: 'Boostrap',
  COOKIE_JWT_TOKEN: 'token',
  COOKIE_APP_STORE: 'store',
  GRAPHQL_ENDPOINT
};

const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about'
};

export default {
  ROUTES,
  ...CONFIG
};
