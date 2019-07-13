import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Redirect, NavLink } from 'react-router-dom'
import axios from 'axios';
import * as MyConsts from '../configs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class Login extends Component {
  state = {
    accesstoken: '',
    refreshtoken: '',
    isAuthenticated: false,
  };

  handleLogout = e => {
    e.preventDefault();
    message.loading("logging out..",2.5);
    this.props.loginCallback();
    this.setState({redirectBack: false});

    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
  }

  handleSubmit = e => {
    e.preventDefault();
    message.loading("validating..",1.0);
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('login:', values.username, values.password);
        axios.post(MyConsts.API_URL + '/api/token/', 
              {username: values.username, password: values.password}, 
              {headers: {"Content-Type": "application/json"}})
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                this.setState({ accesstoken: data.access, refreshtoken: data.refresh, isAuthenticated: true });                
                message.info("Logged in");
                localStorage.setItem('accesstoken',data.access)
                localStorage.setItem('refreshtoken',data.refresh)
                localStorage.setItem('username',values.username)
                localStorage.setItem('userid',2)
            })
            .catch(function (error) {
                message.error("Axios backend active user error: "+error);
            })
      }
      else {
        message.error("Form validation errors: "+err);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;  

    if (this.state.isAuthenticated === true) {
      return (
        <div>
          <Button onClick={this.handleLogout} >Sign Out</Button>
          <p>
            Logged in:  { this.state.accesstoken }
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
          Logged in:  { this.props.activeUserName }
        </div>
      </Form>
    );
  }
}
