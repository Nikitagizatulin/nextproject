import React, { Component } from 'react';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import { Drawer, Button } from 'antd';
import NavbarStyles from './NavbarStyles';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class Navbar extends Component {
    state = {
        current: 'home',
        visible: false
    };

    showDrawer = () => {
        this.setState({
            visible: true
        });
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    };

    static propTypes = {
        router: PropTypes.object.isRequired
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
            current: active_link
        };
    }

    render() {
        return (
            <NavbarStyles>
                <nav className="menuBar">
                    <div className="logo">
                        <Link href="/">
                            <a>Todo Project</a>
                        </Link>
                    </div>
                    <div className="menuCon">
                        <div className="leftMenu">
                            <LeftMenu selectedKeys={[this.state.current]} />
                        </div>
                        <div className="rightMenu">
                            <RightMenu />
                        </div>
                        <Button
                            className="barsMenu"
                            type="primary"
                            onClick={this.showDrawer}
                        >
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
            </NavbarStyles>
        );
    }
}
export default withRouter(Navbar);
