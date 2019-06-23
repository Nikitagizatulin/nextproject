import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import * as userActions from 'store/user/actions';

class TodosComponent extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    };

    render() {
        return (
            <Row type="flex" justify="center" align="middle">
                <Col
                    xs={{ span: 23 }}
                    sm={{ span: 23 }}
                    md={{ span: 21 }}
                    lg={{ span: 20 }}
                    xl={{ span: 18 }}
                >
                    <h1>Profile page</h1>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

const mapActionsToProps = { ...userActions };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(TodosComponent);
