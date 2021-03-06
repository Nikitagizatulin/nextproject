import React, { Component } from 'react';
import {
    Modal,
    Form,
    Input,
    Tooltip,
    Icon,
    DatePicker,
    Row,
    Col,
    Button,
    Select
} from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from 'store/user/actions';
import { fetchStatistic } from 'store/todos/actions';

class Register extends Component {
    state = {
        confirmDirty: false,
        error: {}
    };

    static propTypes = {
        visible: PropTypes.bool,
        closeModal: PropTypes.func,
        registerUser: PropTypes.func,
        form: PropTypes.object.isRequired,
        fetchStatistic: PropTypes.func
    };

    static defaultProps = {
        visible: false,
        closeModal: () => {},
        registerUser: () => {},
        fetchStatistic: () => {}
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props
                    .registerUser(values)
                    .then(() => {
                        this.props.closeModal();
                        this.props.fetchStatistic();
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

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { visible, closeModal } = this.props;
        const { getFieldDecorator } = this.props.form;

        const { error } = this.state;

        const errorProps = {};

        const errorKeys = Object.keys(error);
        if (errorKeys.length != 0) {
            errorKeys.map(key => {
                errorProps[key] = {
                    validateStatus: 'error',
                    help: error[key].message
                };
            });
        }
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };

        const date_config = {
            rules: [
                {
                    type: 'object',
                    required: true,
                    message: 'Please select date of birth'
                }
            ]
        };

        const gender_config = {
            rules: [{ required: true, message: 'Please select your gender!' }]
        };

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
                    pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                    message:
                        'Password field must contain at least one number, one lowercase, one uppercase letter and least six characters'
                },
                {
                    validator: this.validateToNextPassword
                }
            ]
        };

        const password_confirm_config = {
            rules: [
                {
                    required: true,
                    message: 'Please confirm your password!'
                },
                {
                    validator: this.compareToFirstPassword
                }
            ]
        };
        const nick_config = {
            rules: [
                {
                    required: true,
                    message: 'Please input your nickname!',
                    whitespace: true
                }
            ]
        };

        const { Option } = Select;

        return (
            <Modal
                title="Register Modal"
                visible={visible}
                onCancel={closeModal}
                footer={null}
            >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="E-mail" hasFeedback {...errorProps.email}>
                        {getFieldDecorator('email', email_config)(<Input />)}
                    </Form.Item>
                    <Form.Item
                        label="DatePicker"
                        hasFeedback
                        {...errorProps.age}
                    >
                        {getFieldDecorator('age', date_config)(
                            <DatePicker format="YYYY-MM-DD" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Gender"
                        hasFeedback
                        {...errorProps.gender}
                    >
                        {getFieldDecorator('gender', gender_config)(
                            <Select placeholder="Select a option and change input text above">
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        hasFeedback
                        {...errorProps.password}
                    >
                        {getFieldDecorator('password', password_config)(
                            <Input.Password autoComplete="new-password" />
                        )}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', password_confirm_config)(
                            <Input.Password
                                autoComplete="new-password"
                                onBlur={this.handleConfirmBlur}
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                        {...errorProps.nickname}
                        label={
                            <span>
                                Nickname&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator('nickname', nick_config)(<Input />)}
                    </Form.Item>

                    <Form.Item>
                        <Row>
                            <Col span={6} offset={12}>
                                <Button type="primary" htmlType="submit">
                                    Register
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
const mapStateToProps = state => state;

export default connect(
    mapStateToProps,
    { registerUser, fetchStatistic }
)(Form.create({ name: 'register' })(Register));
