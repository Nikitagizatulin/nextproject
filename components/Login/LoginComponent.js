import React, { Component } from 'react';
import { Modal, Form, Icon, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from 'store/user/actions';

class Login extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        closeModal: PropTypes.func.isRequired,
        loginUser: PropTypes.func.isRequired,
        form: PropTypes.object.isRequired,
        openRegisterModal: PropTypes.func.isRequired
    };

    static defaultProps = {
        visible: false
    };

    state = {
        error: {}
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props
                    .loginUser(values)
                    .then(() => {
                        this.props.closeModal();
                    })
                    .catch(({ payload }) => {
                        const error = payload.response.data;

                        this.setState({
                            error
                        });
                    });
            }
        });
    };

    render() {
        const { visible, closeModal, openRegisterModal } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { error } = this.state;
        
        const errorProps = {
            email: {},
            password: {}
        };
        
        const errorKeys = Object.keys(error);
        if (errorKeys.length != 0) {
            errorKeys.map(key => {
                errorProps[key] = {
                    validateStatus: 'error',
                    help: error[key].message
                };
            });
        }

        const email_config = {
            rules: [
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                },
                {
                    required: true,
                    message: 'Please input your E-mail!'
                }
            ]
        };

        const password_config = {
            rules: [
                {
                    required: true,
                    message: 'Please input your password!'
                },
                {
                    validator: this.validateToNextPassword
                }
            ]
        };

        return (
            <Modal
                title="Login Modal"
                visible={visible}
                onCancel={closeModal}
                footer={null}
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item {...errorProps.email} hasFeedback>
                        {getFieldDecorator('email', email_config)(
                            <Input
                                prefix={
                                    <Icon
                                        type="user"
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                placeholder="Email"
                            />
                        )}
                    </Form.Item>
                    <Form.Item {...errorProps.password} hasFeedback>
                        {getFieldDecorator('password', password_config)(
                            <Input.Password
                                prefix={
                                    <Icon
                                        type="lock"
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            block
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                        Or <a onClick={openRegisterModal}>register now!</a>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = state => state;

export default connect(
    mapStateToProps,
    { loginUser }
)(Form.create({ name: 'normal_login' })(Login));
