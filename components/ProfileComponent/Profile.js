import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    DatePicker,
    Row,
    Col,
    Button,
    Select,
    Divider,
    message
} from 'antd';
import PropTypes from 'prop-types';
import * as userActions from 'store/user/actions';

class Profile extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        form: PropTypes.object.isRequired,
        updateUser: PropTypes.func.isRequired
    };

    state = {
        confirmDirty: false,
        error: {}
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props
                    .updateUser(values)
                    .then(() => {
                        message.success('Your profile has been updated!');
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

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('new_password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        const { user } = this.props;
        const { error } = this.state;

        const errorProps = {
            email: {},
            old_passwrod: {},
            age: {},
            gender: {},
            nickname: {},
            new_password: {}
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

        const date_config = {
            initialValue: user.age && moment(user.age, 'YYYY-MM-DD')
        };

        const gender_config = {
            initialValue: user.gender
        };

        const email_config = {
            initialValue: user.email,
            rules: [
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                }
            ]
        };

        const password_config = {
            rules: [
                {
                    validator: this.validateToNextPassword
                }
            ]
        };
        const password_confirm_config = {
            rules: [
                {
                    validator: this.compareToFirstPassword
                }
            ]
        };
        const nick_config = {
            initialValue: user.nickname
        };

        return (
            <Row type="flex" justify="center" align="middle">
                <Col
                    xs={{ span: 23 }}
                    sm={{ span: 23 }}
                    md={{ span: 21 }}
                    lg={{ span: 20 }}
                    xl={{ span: 18 }}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="E-mail" {...errorProps.email}>
                            {getFieldDecorator('email', email_config)(
                                <Input autoComplete="new-password" />
                            )}
                        </Form.Item>
                        <Form.Item label="DatePicker" {...errorProps.age}>
                            {getFieldDecorator('age', date_config)(
                                <DatePicker format="YYYY-MM-DD" />
                            )}
                        </Form.Item>
                        <Form.Item label="Gender" {...errorProps.gender}>
                            {getFieldDecorator('gender', gender_config)(
                                <Select placeholder="Select a option and change input text above">
                                    <Option value="male">male</Option>
                                    <Option value="female">female</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...errorProps.old_passwrod}>
                            <Input.Password
                                autoComplete="old-password"
                                name="old_passwrod"
                                prefix={
                                    <Icon
                                        type="lock"
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                placeholder="Old password"
                            />
                        </Form.Item>
                        <Divider />
                        <Form.Item
                            label="Password"
                            hasFeedback
                            {...errorProps.new_password}
                        >
                            {getFieldDecorator('new_password', password_config)(
                                <Input.Password
                                    placeholder="New password"
                                    autoComplete="new-password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Confirm Password" hasFeedback>
                            {getFieldDecorator(
                                'confirm',
                                password_confirm_config
                            )(
                                <Input.Password
                                    placeholder="New password confirmation"
                                    autoComplete="new-password"
                                    onBlur={this.handleConfirmBlur}
                                />
                            )}
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                    Nickname&nbsp;
                                    <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            }
                            {...errorProps.nickname}
                        >
                            {getFieldDecorator('nickname', nick_config)(
                                <Input placeholder="John Doe" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Row>
                                <Col span={6} offset={12}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                    >
                                        Update profile
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
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
)(Form.create({ name: 'profile' })(Profile));
