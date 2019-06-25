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
        console.log('Logged in - received values of form: ', values);
        this.props.loginCallback(values.username, values.password);
        
        if (this.props.isLoggedIn) {
          console.log('sucess dougfoo login ');
          message.loading("validating..",2.5).then(() => {
            message.success("logged in!",1.0);
          });
        }
        else {
          // invalid login
          console.log('fail dougfoo login redir ?');
          message.error('incorrect login and/or password(1)',1.0); 
        }
      }
      else {
        console.log('validation erors - props.form.validateFields');
        message.error('failed to login validateFieldsErr',1.0);
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
          Or <a href="">register now!</a>
        </Form.Item>
        <div>
          Logged in:  { this.props.isLoggedIn ? "Y" : "N" }
        </div>
      </Form>
    );
  }
}
