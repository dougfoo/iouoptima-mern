import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import * as MyConsts from '../configs';

export default class Login extends Component {
  state = {
    loggedIn: false
  }

  componentDidMount() {
    if (localStorage.getItem('userid') != null) {
      this.setState({loggedIn: true});
    }
  }

  handleLogout = e => {
    e.preventDefault();
    message.loading("logging out..",2.5);

    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    localStorage.removeItem('activeUser');

    this.setState({loggedIn: false});
    this.props.setLogout(true);
  }

  handleLogin = e => {
    e.preventDefault();
    message.loading("validating..",1.0);
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        axios.post(MyConsts.API_URL + '/api/token/', 
              {username: values.username, password: values.password}, 
              {headers: {"Content-Type": "application/json"}})
            .then(response => response.data)
            .then((data) => {
                console.log('login reply',data);
                message.info("Logged in");
                localStorage.setItem('accesstoken',data.access)
                localStorage.setItem('refreshtoken',data.refresh)
                localStorage.setItem('username',values.username)
            })
            .catch(function (error) {
                message.error("Axios backend active user error: "+error);
            })
        axios.get(MyConsts.API_URL + '/login/' + values.username + '/')
          .then(response => response.data) 
          .then((data) => {
            console.log('userid fetch: ' + data.userid)
            localStorage.setItem('userid',data.userid)                    
            this.setState({loggedIn: true});  // page conflict w/ header refresh
          })
          .catch(function (error) {
              message.error("Axios backend active user error on loginid fetch: "+error);
          })
          this.props.setLogout(false);  // page conflict w/ header refresh
      }
      else {
        message.error("Form validation errors: "+err);
      }
    });
  };

  render() {
    const loginTokens = MyConsts.getTokens();
    const { getFieldDecorator } = this.props.form;  

    if (! this.props.loggedOut) {
      return (
        <div>
          <Button onClick={this.handleLogout} >Sign Out</Button>
          <p>
            Logged in:  { loginTokens.username }
          </p>
        </div>
      )
    }
    else {
      return (       
        <Form onSubmit={this.handleLogin} className="login-form">
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
}
