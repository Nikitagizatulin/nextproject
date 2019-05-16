import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
class LeftMenu extends Component {
  static propTypes = {
    selectedKeys: PropTypes.array,
  };

  static defaultProps = {
    selectedKeys: [],
  };

  render() {
    const { selectedKeys } = this.props;
    return (
      <Menu mode="horizontal" selectedKeys={selectedKeys}>
        <Menu.Item key="home">
          <Link href="/">
            <a>
              <Icon type="home" />
              Home
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link href="/about">
            <a>
              <Icon type="read" />
              About project
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default LeftMenu;
