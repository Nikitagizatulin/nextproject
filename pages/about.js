import Head from 'next/head';
import React from 'react';
import Styles from '../pages_styles/home';
import Navbar from '../components/Navbar';

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

export default About;
