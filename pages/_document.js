// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const page = ctx.renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, ...page, styleTags };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="favicon" type="image/x-icon" href="/static/favicon.ico" />
          <meta name="viewport" content="initial-scale=1.2, width=device-width" />
          <link href="https://fonts.googleapis.com/css?family=Quando" rel="stylesheet"/>
          <link href="/static/css/nprogress.css" rel="stylesheet"/>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
