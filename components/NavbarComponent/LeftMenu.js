import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LeftMenu extends Component {
  static propTypes = {
    selectedKeys: PropTypes.array,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    selectedKeys: [],
  };

  render() {
    const { selectedKeys, isAuthenticated } = this.props;

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
        {isAuthenticated && (
          <Menu.Item key="todo">
            <Link href="/todo">
              <a>
                <Icon type="unordered-list" />
                Todo list
              </a>
            </Link>
          </Menu.Item>
        )}
        {isAuthenticated && (
          <Menu.Item key="profile">
            <Link href="/profile">
              <a>
                <Icon type="user" />
                User Profile
              </a>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(LeftMenu);
