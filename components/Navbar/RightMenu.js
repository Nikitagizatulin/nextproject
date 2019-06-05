import React, { Component, Fragment } from 'react';
import { Menu } from 'antd';
import LoginComponent from 'components/Login';
import RegisterComponent from 'components/RegisterComponent';

class RightMenu extends Component {
  state = {
    openedLoginModal: false,
    openedRegisterModal: false,
  };

  closeModalHandler = () => {
    this.setState({
      openedLoginModal: false,
      openedRegisterModal: false,
    });
  };

  render() {
    const { openedLoginModal, openedRegisterModal } = this.state;
    const { closeModalHandler } = this;
    return (
      <Fragment>
        <Menu mode="horizontal">
          <Menu.Item
            key="login"
            onClick={() => {
              this.setState({ openedLoginModal: true });
            }}
          >
            <a>Login</a>
          </Menu.Item>
          <Menu.Item
            key="register"
            onClick={() => {
              this.setState({ openedRegisterModal: true });
            }}
          >
            <a>Signup</a>
          </Menu.Item>
        </Menu>
        <LoginComponent visible={openedLoginModal} closeModal={closeModalHandler} />
        <RegisterComponent visible={openedRegisterModal} closeModal={closeModalHandler} />
      </Fragment>
    );
  }
}
export default RightMenu;
