// next.config.js
require('dotenv').config();
const withCSS = require('@zeit/next-css');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = withCSS({
    cssLoaderOptions: {
        url: false
    },
    webpack: config => {
        config.resolve.alias = Object.assign({}, config.resolve.alias, {
            components: path.resolve(__dirname, 'components'),
            store: path.resolve(__dirname, 'store'),
            utils: path.resolve(__dirname, 'utils')
        });
        config.plugins = [
            ...config.plugins,

            // Read the .env file
            new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true
            })
        ];
        return config;
    }
});
