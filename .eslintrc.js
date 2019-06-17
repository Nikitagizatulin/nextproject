module.exports = {
    extends: 'airbnb',
    env: {
        es6: true,
        node: true,
        browser: true,
        commonjs: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'no-console': 0
    },
    globals: {
        localStorage: true
    }
};
