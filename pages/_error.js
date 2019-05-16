import Head from 'next/head';
import Navbar from 'components/Navbar';
import React from 'react';
import Styles from '../pages_styles/error';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <Styles>
        <Head>
          <title>Next project: Page not found</title>
        </Head>
        <Navbar />
        <p>
          {this.props.statusCode
            ? `An error ${this.props.statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
      </Styles>
    );
  }
}

export default Error;
