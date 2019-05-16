import React, { Component } from "react";
import ReactDom from "react-dom";
import "./Login.css";
import { stat } from "fs";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginOpen: true, isRegisterOpen: false
    };
  }

  showLoginBox() {
    this.setState({isRegisterOpen:false, isLoginOpen: true});
  }

  showRegisterBox() {
    this.setState({isRegisterOpen:true, isLoginOpen: false});
  }

  render() {
    return (
      <div className="Login">
        <div className="Container">
          <div className="Box" onClick={this.showLoginBox.bind(this)}>
            Login
          </div>
          <div className="Box" onClick={this.showRegisterBox.bind(this)}>
            Register
          </div>      
        </div>
        <div className="Container">
          { this.state.isLoginOpen && <LoginBox/> }
          { this.state.isRegisterOpen && <RegisterBox/> }
        </div>
      </div>
    );
  }
}

class LoginBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  submitLogin() {
  }

  render() {
    return (
      <div className="Login">
        <div className="Header">
        Login
        </div>
        <div className="Box"> 
          <div className="input-group">
            <label htmlFor="username">Username</label>      
            <input type="text" name="username" className="login-input" placeholder="Username" />
          </div>          
          <div className="input-group">
            <label htmlFor="password">Password</label>      
            <input type="password" name="password" className="login-input" placeholder="Password" />
          </div>          

          <button type="button" className="login-btn" onClick={this.submitLogin.bind(this)}>Login</button>
        </div>
      </div>
    );
  }
}

class RegisterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      email: '',
      password: '',
      password2: '',
      username: ''
    };
  }

  submitRegister() {
    if (this.state.username == '') {
      this.showValidationErr("username", "username is empty");
    }
    if (this.state.password == '') {
      this.showValidationErr("password", "password is empty");
    } 
    if (this.state.email == '') {
      this.showValidationErr("email", "email is empty");
    }
  }

  showValidationErr(elem, msg) {
    this.setState((prevState) => ({ errors: [ ...prevState.errors, { elem, msg }]}));
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
    console.log('change username: '+e.target.value);
    this.clearValidationErr('username');
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    console.log('change email: '+e.target.value);
    this.clearValidationErr('email');
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    console.log('change passwrod: '+e.target.value);
    this.clearValidationErr('password');
  }

  clearValidationErr(elem) {
    this.setState((prevState) => {
      let newarr = []
      for (let err of prevState.errors) {
        if (elem != err.elem) {
          newarr.push(err);
        }        
      }
      return {errors: newarr};
    });
  }


  render() {

    let usernameErr = null, passwordErr = null, emailErr = null;

    for (let err of this.state.errors) {
      if (err.elem == "username") {
        usernameErr = err.msg;
      }
      else if (err.elem == "email") {
        emailErr = err.msg;        
      }
      else if (err.elem == "password") {
        passwordErr = err.msg;
      }
    }

    return (
      <div className="Login">
        <div className="Header">
        Register
        </div>
        <div className="Box"> 
          <div className="input-group">
            <label htmlFor="username">Username</label>      
            <input onChange={this.onUsernameChange.bind(this)} type="text" name="username" className="login-input" placeholder="Username" />
            <small className="danger-warning">{ usernameErr ? usernameErr : '' }</small>
          </div>          
          <div className="input-group">
            <label htmlFor="password">Password</label>      
            <input onChange={this.onPasswordChange.bind(this)} type="password" name="password" className="login-input" placeholder="Password" />
            <small className="danger-warning">{ passwordErr ? passwordErr : '' }</small>
          </div>          
          <div className="input-group">
            <label htmlFor="password">Password Confirm</label>      
            <input type="password" name="password2" className="login-input" placeholder="Password" />
          </div>          
          <div className="input-group">
            <label htmlFor="email">Email</label>      
            <input onChange={this.onEmailChange.bind(this)} type="text" name="email" className="login-input" placeholder="Email" />
            <small className="danger-warning">{ emailErr ? emailErr : '' }</small>
          </div>          

          <button type="button" className="login-btn" onClick={this.submitRegister.bind(this)}>Register</button>
        </div>
      </div>
    );
  }
}
