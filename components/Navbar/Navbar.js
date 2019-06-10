import React, { Component } from 'react';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import { Drawer, Button } from 'antd';
import Styled from './styles';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class Navbar extends Component {
  state = {
    current: 'home',
    visible: false,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  static getDerivedStateFromProps(props, state) {
    let active_link;
    switch (props.router.pathname) {
      case '/about':
        active_link = 'about';
        break;
      case '/todo':
        active_link = 'todo';
        break;
      case '/profile':
        active_link = 'profile';
        break;
      case '/':
        active_link = 'home';
        break;
      default:
        active_link = '';
    }
    return {
      ...state,
      current: active_link,
    };
  }

  render() {
    return (
      <Styled>
        <nav className="menuBar">
          <div className="logo">
            <Link href="/">
              <a>Todo Porject</a>
            </Link>
          </div>
          <div className="menuCon">
            <div className="leftMenu">
              <LeftMenu selectedKeys={[this.state.current]} />
            </div>
            <div className="rightMenu">
              <RightMenu />
            </div>
            <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
              <span className="barsBtn" />
            </Button>
            <Drawer
              title="Basic Drawer"
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <LeftMenu />
              <RightMenu />
            </Drawer>
          </div>
        </nav>
      </Styled>
    );
  }
}
export default withRouter(Navbar);
