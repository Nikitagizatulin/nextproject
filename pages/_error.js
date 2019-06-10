import Head from 'next/head';
import Navbar from 'components/Navbar';
import React from 'react';
import { Typography } from 'antd';
import Styles from '../pages_styles/error';

const { Title } = Typography;

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode, title } = this.props;
    return (
      <Styles>
        <Head>
          <title>Next project: Page not found</title>
        </Head>
        <Navbar />
        <div className="error-block">
          <img src="/static/images/error-iamge.jpg" alt="error" className="error-image" />
          <Title type="danger">
            Error code:
            {statusCode}
          </Title>
          {title && (
            <Title type="danger" level={3}>
              {title}
            </Title>
          )}
        </div>
      </Styles>
    );
  }
}

export default Error;
