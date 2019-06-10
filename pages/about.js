import Head from 'next/head';
import React from 'react';
import Navbar from 'components/Navbar';
import WithAuth from 'components/common_components/WithAuth';

import Styles from '../pages_styles/home';

class About extends React.Component {
  render() {
    return (
      <Styles>
        <Head>
          <title>Next project: About page</title>
        </Head>
        <Navbar />
        <h1>This test project for Rezet company.</h1>
      </Styles>
    );
  }
}

export default WithAuth(About);
