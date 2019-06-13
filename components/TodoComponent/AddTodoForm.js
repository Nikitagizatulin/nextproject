import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon } from 'antd';

export default class AddTodoForm extends Component {
    static propTypes = {
        form: PropTypes.object
    };
    static defaultProps = {
        form: {}
    };

    state = {
        message: ''
    };

    sumbutHandler = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                // context.state.handleToDoAdd(values);
                // message.success('ToDo added');
                this.setState({ message: '' });
                this.props.form.resetFields();
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };

        return (
            <Form onSubmit={this.sumbutHandler} layout="inline">
                <Form.Item {...formItemLayout} label="ToDo">
                    {getFieldDecorator('ToDo', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input A Todo'
                            }
                        ],
                        initialValue: this.state.message
                    })(
                        <Input
                            prefix={<Icon type="tags" />}
                             placeholder="What need to be done?"
                        />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        <Icon type="plus-circle" />
                        Add
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
