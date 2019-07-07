import React, { Component } from "react";
import { Form,Input,Select,message,Checkbox,Button,AutoComplete } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import * as MyConsts from '../configs';

const { Option } = Select;

export default class Register extends React.Component {
  state = {
    confirmDirty: false,
    registered: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        try {
//        values.email, values.password, values.firstName, values.lastName, values.confirm, values.phone
          const response = axios.post(MyConsts.API_URL + '/users/', values);
          console.log(response);
          this.setState({ registered: true });  // should check if really registered w/o errors first
          this.props.registerCallback(values.email);
          message.success("Registered Successfully!");
        }
        catch(error) {
          this.setState({ registered: false });  // should check if really registered w/o errors first
          message.error("save error: "+error);
        }
      }
    });
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  
  render() {
    if (this.props.activeUser) {
      console.log('active user present:');
      console.log(this.props.activeUser);
    }

    if (this.state.registered === true) {
      return (
        <div>
          <p>
            Registered !  Please Login now:  <NavLink to='/login'>Login</NavLink>
          </p>
        </div>
      )
    }

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '1',
    })(
      <Select style={{ width: 70 }}>
        <Option value="1">+1</Option>
        <Option value="81">+81</Option>
      </Select>,
    );

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="First Name">
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input your first name!' }]
          })(<Input />)}
        </Form.Item> 
        <Form.Item label="Lost Name">
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input your lost name!' }]
          })(<Input />)}
        </Form.Item> 
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
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
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            rules: [
              { required: true, message: 'Please agree or die!' },
            ],
            valuePropName: 'checked'
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
