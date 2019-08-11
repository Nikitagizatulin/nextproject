import React, { Component, Fragment } from 'react';
import { Menu } from 'antd';
import Login from 'components/LoginComponent/Login';
import Register from 'components/RegisterComponent/Register';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { logoutUser } from 'store/user/actions';

class RightMenu extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        logoutUser: PropTypes.func.isRequired
    };

    state = {
        openedLoginModal: false,
        openedRegisterModal: false
    };

    closeModalHandler = () => {
        this.setState({
            openedLoginModal: false,
            openedRegisterModal: false
        });
    };

    logout = () => {
        this.props.logoutUser();
        Router.push('/');
    };

    guestLinks = () => (
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
    );

    authLinks = () => (
        <Menu mode="horizontal">
            <Menu.Item key="login" onClick={this.logout}>
                <a>Logout</a>
            </Menu.Item>
        </Menu>
    );

    render() {
        const { openedLoginModal, openedRegisterModal } = this.state;
        const { closeModalHandler, guestLinks, authLinks } = this;
        const { isAuthenticated } = this.props;

        return (
            <Fragment>
                {isAuthenticated ? authLinks() : guestLinks()}
                <Login
                    visible={openedLoginModal}
                    closeModal={closeModalHandler}
                    openRegisterModal={() => {
                        this.setState({
                            openedLoginModal: false,
                            openedRegisterModal: true
                        });
                    }}
                />
                <Register
                    visible={openedRegisterModal}
                    closeModal={closeModalHandler}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(RightMenu);
