import React, { Component } from "react";
import { Form, Input, Icon, Button } from 'antd';
import "./Login.css";
import { NavLink } from 'react-router-dom';

const FormItem = Form.Item;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
        </FormItem>

        <FormItem>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
        </FormItem>

        <FormItem>
        <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
            Login
        </Button>
        Or 
        <NavLink 
            style={{marginRight: '10px'}} 
            to='/signup/'> signup
        </NavLink>
        </FormItem>
      </Form>
      </div>
    );
  }
}