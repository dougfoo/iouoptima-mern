import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Redirect } from 'react-router-dom'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      console.log(err);
      console.log(values);
      if (!err) {        
        message.loading("validating..",2.5).then(() => {
          message.success("logged in!",1.0);
        });
        console.log('Logged in - received values of form: ', values);
        if (values.username === 'dougcha' && values.password === 'dougcha') {
          await sleep(2000);
          this.props.loginCallback(values.username, values.password);
          console.log('sucess dougfoo login');
        }
        else {
          // invalid login
          console.log('fail dougfoo login redir ?');
          message.error('failed to login',1.0);

          this.props.form.setFields({
            username: {
              value: values.username,
              errors: [new Error('incorrect login and/or password')],
            },
            password: {
              value: values.password,
              errors: [new Error('incorrect login and/or password')],
            },
          });        
        }
      }
      else {
        console.log('validation erors - props.form.validateFields');
      }
    });
  };

  render() {
    if(this.props.isLoggedIn){
      console.log('redirecting..');
      setTimeout(function() { 
        return <Redirect to='/loans'/>;   // this doesn't work....
      }.bind(this), 5000);
      console.log('redirecting done ? ..');
    }

    const { getFieldDecorator } = this.props.form;

    const customValidatePassword = (rule, value, callback) => {
      if (!value && value === "") {
        callback("Password blank");
      } else {
        callback();
      }
    };
  
    return (       
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' },
            { validator: customValidatePassword }
          ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
        <div>
          Logged in:  { this.props.isLoggedIn ? "Y" : "N" }
        </div>
      </Form>
    );
  }
}
