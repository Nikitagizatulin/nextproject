import Head from 'next/head';
import React from 'react';
import Styles from '../pages_styles/home';
import Navbar from '../components/Navbar';

class Index extends React.Component {
 
  render() {
    return (
      <Styles>
        <Head>
          <title>Next project: Homepage</title>
        </Head>
        <Navbar />
        <h1>Hello world from next.js</h1>
        <img src="/static/example.jpeg" alt="example" />
      </Styles>
    );
  }
}

export default Index;
