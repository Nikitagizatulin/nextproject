import React, { Component } from 'react';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import { Drawer, Button } from 'antd';
import Styled from './styles';
import Link from 'next/link';

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

  changeActiveLink = e => {
    this.setState({
      current: e.key,
    });
  };

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
              <LeftMenu changeActiveLink={this.changeActiveLink} selectedKeys={[this.state.current]} />
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
export default Navbar;
/* <Link href="about">
            <a title="About Next JS">About Next JS</a>
          </Link>
          <Link href="/">
            <a title="Our API">API</a>
          </Link> */
