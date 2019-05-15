import React, { Component } from "react";
import ReactDom from "react-dom";
import "./Login.css";

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
    };
  }

  submitRegister() {
  }


  render() {
    return (
      <div className="Login">
        <div className="Header">
        Register
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
          <div className="input-group">
            <label htmlFor="password">Password Confirm</label>      
            <input type="password" name="password2" className="login-input" placeholder="Password" />
          </div>          
          <div className="input-group">
            <label htmlFor="email">Email</label>      
            <input type="text" name="email" className="login-input" placeholder="Email" />
          </div>          

          <button type="button" className="login-btn" onClick={this.submitRegister.bind(this)}>Register</button>
        </div>
      </div>
    );
  }
}
