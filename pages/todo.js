import Head from 'next/head';
import React from 'react';
import Navbar from 'components/Navbar';
import { List, Icon } from 'antd';
import WithAuth from 'components/common_components/WithAuth';
import { connect } from 'react-redux';

import Styles from '../pages_styles/home';

class Todo extends React.Component {
  render() {
    return (
      <Styles>
        <Head>
          <title>Todo list</title>
        </Head>
        <Navbar />
        <List.Item actions={[<Icon type="delete" key ="1" theme="outlined" />]}>
          <List.Item.Meta title="Title" />
        </List.Item>
      </Styles>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(WithAuth(Todo));
