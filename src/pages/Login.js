import React, { Component } from "react";
import ReactDom from "react-dom";
import { stat } from "fs";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.setLogin = this.setLogin.bind(this);  // for sub-container callback
    this.state = {
      isLoginOpen: true, isRegisterOpen: false, s: false
    };
  }

  setLogin() {
    this.setState({ isLoggedIn: true });
  }

  showLoginBox() {
    this.setState({isRegisterOpen:false, isLoginOpen: true});
  }

  showRegisterBox() {
    this.setState({isRegisterOpen:true, isLoginOpen: false});
  }

  render() {
    return (
      <div className="root-container">
        <div className="box-container">
          <div className="controller" onClick={this.showLoginBox.bind(this)}>
            Login
          </div>
          <div className="controller" onClick={this.showRegisterBox.bind(this)}>
            Register
          </div>      
        </div>
        <div className="box-container">
          { this.state.isLoginOpen && <LoginBox callbackLogin={this.setLogin} /> }
          { this.state.isRegisterOpen && <RegisterBox/> }
        </div>
        <div className="header">
          Logged in:  { this.state.isLoggedIn ? "Y" : "N" }
        </div>
      </div>
    );
  }
}

class LoginBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      username: '',
      password: '',
    }
  }

  submitLogin() {
    if (this.state.username == '') {
      this.showValidationErr("username", "username is empty");
    }
    if (this.state.password == '') {
      this.showValidationErr("password", "password is empty");
    } 

    if (this.state.username == 'dougcha' && this.state.password == 'dougcha') {
      this.props.callbackLogin();   // callback to container
    }
    else {
      this.showValidationErr("password", "usrname or password is incorrect");
    }

    console.log('submitLogin'+ this.state.username + ' ' + this.state.password);
  }

  showValidationErr(elem, msg) {
    this.setState((prevState) => ({ errors: [ ...prevState.errors, { elem, msg }]}));
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    console.log('change passwrod: '+e.target.value);
    this.clearValidationErr('password');
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
    console.log('change username: '+e.target.value);
    this.clearValidationErr('username');
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
    let usernameErr = null, passwordErr = null;

    for (let err of this.state.errors) {
      if (err.elem == "username") {
        usernameErr = err.msg;
      }
      else if (err.elem == "password") {
        passwordErr = err.msg;
      }
    }
    return (
      <div className="inner-container">
        <div className="header">
        </div>
        <div className="box"> 
          <div className="input-group">
            <label htmlFor="username">Username</label>      
            <input type="text" onChange={this.onUsernameChange.bind(this)} name="username" className="login-input" placeholder="Username" />
            <small className="danger-error">{ usernameErr ? usernameErr : '' }</small>
          </div>          
          <div className="input-group">
            <label htmlFor="password">Password</label>      
            <input type="password" onChange={this.onPasswordChange.bind(this)} name="password" className="login-input" placeholder="Password" />
            <small className="danger-error">{ passwordErr ? passwordErr : '' }</small>
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
      <div className="inner-container">
        <div className="header">
        Register
        </div>
        <div className="box"> 
          <div className="input-group">
            <label htmlFor="username">Username</label>      
            <input onChange={this.onUsernameChange.bind(this)} type="text" name="username" className="login-input" placeholder="Username" />
            <small className="danger-error">{ usernameErr ? usernameErr : '' }</small>
          </div>          
          <div className="input-group">
            <label htmlFor="password">Password</label>      
            <input onChange={this.onPasswordChange.bind(this)} type="password" name="password" className="login-input" placeholder="Password" />
            <small className="danger-error">{ passwordErr ? passwordErr : '' }</small>
          </div>          
          <div className="input-group">
            <label htmlFor="password">Password Confirm</label>      
            <input type="password" name="password2" className="login-input" placeholder="Password" />
          </div>          
          <div className="input-group">
            <label htmlFor="email">Email</label>      
            <input onChange={this.onEmailChange.bind(this)} type="text" name="email" className="login-input" placeholder="Email" />
            <small className="danger-error">{ emailErr ? emailErr : '' }</small>
          </div>          

          <button type="button" className="login-btn" onClick={this.submitRegister.bind(this)}>Register</button>
        </div>
      </div>
    );
  }
}
