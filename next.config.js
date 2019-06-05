// next.config.js
const withCSS = require('@zeit/next-css');
const path = require('path');

module.exports = withCSS({
  cssLoaderOptions: {
    url: false,
  },
  webpack: (config) => {
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      components: path.resolve(__dirname, 'components'),
      store: path.resolve(__dirname, 'store'),
    });
    return config;
  },
});
