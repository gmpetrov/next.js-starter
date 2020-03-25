require('dotenv').config();
const path = require('path');
const withSass = require('@zeit/next-sass');
const withPlugins = require('next-compose-plugins');

const getAppVars = (filter = 'APP_') => {
  const keys = Object.keys(process.env).filter(each => each.startsWith(filter));
  const regexp = new RegExp(`${filter}_?`);

  const vars = keys.reduce((acc, key) => {
    // Remove env var prefix
    const newKey = key.replace(regexp, '');

    return {
      ...acc,
      [newKey]: process.env[key]
    };
  }, {});

  return vars;
};

module.exports = withPlugins([withSass], {
  webpack: config => {
    config.resolve.alias['@app'] = path.resolve(__dirname);
    return config;
  },
  serverRuntimeConfig: {
    ...getAppVars('APP_SERVER')
  },
  publicRuntimeConfig: {
    ...getAppVars('APP_PUBLIC')
  }
});
