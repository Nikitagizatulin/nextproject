import React from 'react';
import App, { Container } from 'next/app';
import 'antd/dist/antd.min.css';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { getCookie } from 'utils/Cookies';
import jsonwebtoken from 'jsonwebtoken';
import makeStore from '../store';
import { userFromCookie } from '../store/user/actions';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const user = process.browser
            ? jsonwebtoken.decode(getCookie('jwt'))
            : jsonwebtoken.decode(getCookie('jwt', ctx.req));
        if (user) {
            await ctx.store.dispatch(
                userFromCookie({ isAuthenticated: !!user, user })
            );
        }

        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Container>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default withRedux(makeStore)(MyApp);
