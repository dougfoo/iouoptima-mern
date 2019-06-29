import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Redirect, NavLink } from 'react-router-dom'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// replace this w/ a backend call and return success/error
const FakeAuthAPI = {
  isAuthenticated: false,
  authenticate(username, password) {
    if (username === password) {
      this.isAuthenticated= true;
      return true;
    }
    else {
      return false;
    }
  },
  signout(cb) {
    this.isAuthenticated= false;
    setTimeout(cb, 100);
  }
}

export default class Login extends Component {
  handleLogout = e => {
    e.preventDefault();
    message.loading("logging out..",2.5);
    FakeAuthAPI.signout();
    this.props.loginCallback();
    this.setState({redirectBack: false});
  }

  handleSubmit = e => {
    e.preventDefault();
    message.loading("validating..",1.0);
    this.props.form.validateFields(async (err, values) => {
      if (!err) {        
        if (FakeAuthAPI.authenticate(values.username, values.password)) {
          this.props.loginCallback(values.username);  //sets state and refreshes
          this.setState({redirectBack: true});
        }
        else {
          message.error("username/password invalid..",2.5);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
  
    if (FakeAuthAPI.isAuthenticated === true) {
      return (
        <div>
          <Button onClick={this.handleLogout} >Sign Out</Button>
          <p>
            Logged in:  { this.props.activeUser }
          </p>
        </div>
      )
    }

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
          Or <NavLink to="/register">register now!</NavLink>
        </Form.Item>
        <div>
          Logged in:  { this.props.activeUser }
        </div>
      </Form>
    );
  }
}
