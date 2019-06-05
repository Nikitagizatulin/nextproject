import React, { Component } from 'react';
import { Modal, Form, Input, Tooltip, Icon, DatePicker, Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from 'store/user/actions';

class RegisterComponent extends Component {
  state = {
    confirmDirty: false,
  };

  static propTypes = {
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    registerUser: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    closeModal: () => {},
    registerUser: () => {},
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.registerUser(values);
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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const date_config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };

    const email_config = {
      rules: [
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        },
      ],
    };

    const password_config = {
      rules: [
        {
          required: true,
          message: 'Please input your password!',
        },
        {
          validator: this.validateToNextPassword,
        },
      ],
    };

    const password_confirm_config = {
      rules: [
        {
          required: true,
          message: 'Please confirm your password!',
        },
        {
          validator: this.compareToFirstPassword,
        },
      ],
    };
    const nick_config = {
      rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
    };
    return (
      <Modal title="Register Modal" visible={visible} onCancel={closeModal} footer={null}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', email_config)(<Input />)}
          </Form.Item>
          <Form.Item label="DatePicker">
            {getFieldDecorator('date-picker', date_config)(<DatePicker />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', password_config)(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', password_confirm_config)(
              <Input.Password onBlur={this.handleConfirmBlur} />,
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

export default connect(mapStateToProps, { registerUser })(Form.create({ name: 'register' })(RegisterComponent));
