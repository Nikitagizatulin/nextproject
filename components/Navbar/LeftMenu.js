import React, { Component } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';

class LeftMenu extends Component {
  static propTypes = {
    changeActiveLink: PropTypes.func,
    selectedKeys: PropTypes.array,
  };

  static defaultProps = {
    changeActiveLink() {},
    selectedKeys: [],
  };

  render() {
    const { changeActiveLink, selectedKeys } = this.props;
    return (
      <Menu mode="horizontal" selectedKeys={selectedKeys} onClick={changeActiveLink}>
        <Menu.Item key="home">
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link href="/about">
            <a>About project</a>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default LeftMenu;
