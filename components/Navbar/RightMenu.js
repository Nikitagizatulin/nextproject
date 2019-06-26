import React, { Component, Fragment } from 'react';
import { Menu } from 'antd';
import LoginComponent from 'components/Login';
import RegisterComponent from 'components/RegisterComponent';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { logoutUser } from 'store/user/actions';

class RightMenu extends Component {
    static propTypes = {
        isAuthnticated: PropTypes.bool.isRequired,
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

    logut = () => {
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
            <Menu.Item key="login" onClick={this.logut}>
                <a>Logout</a>
            </Menu.Item>
        </Menu>
    );

    render() {
        const { openedLoginModal, openedRegisterModal } = this.state;
        const { closeModalHandler, guestLinks, authLinks } = this;
        const { isAuthnticated } = this.props;

        return (
            <Fragment>
                {isAuthnticated ? authLinks() : guestLinks()}
                <LoginComponent
                    visible={openedLoginModal}
                    closeModal={closeModalHandler}
                    openRegisterModal={() => {
                        this.setState({
                            openedLoginModal: false,
                            openedRegisterModal: true
                        });
                    }}
                />
                <RegisterComponent
                    visible={openedRegisterModal}
                    closeModal={closeModalHandler}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthnticated: state.user.isAuthnticated
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(RightMenu);
