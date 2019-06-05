import React from 'react';

export default AuthComponent => class DefaultPage extends React.Component {
  static async getInitialProps(ctx) {
    // get user from cookie if 
    const authUser = process.browser
      ? await getUserFromLocalCookie()
      : await getUserFromServerCookie(ctx.req);

      // Check if Page has a `getInitialProps`; if so, call it.
    const pageProps = AuthComponent.getInitialProps && AuthComponent.getInitialProps(ctx);
    return {
      ...pageProps,
      authUser,
      currentUrl: ctx.pathname,
      isAuthnticated: !!authUser,
    };
  }
};
