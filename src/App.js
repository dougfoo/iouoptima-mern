import 'antd/dist/antd.css';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Redirect } from 'react-router-dom';
import { Form, Layout, Menu, } from 'antd';

import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Loans from './pages/Loans';
import Users from './pages/Users';
import Profile from './pages/Profile';

const { Header, Footer, Content } = Layout;

class App extends Component {
  state = {
    isAuthenticated: false,
    activeUsername: 'nobody',
    activeUser: {
      id: 1,
      firstName: 'doug',
      lastName: 'foo',
      phone: '650-629-9731',
      email: 'doug.foo@gmail.com',
      friends: [],
      password: 'abcd'
    },
  };

  componentDidMount() {
    console.log('consolemount');
  }

  setRegister = (username) => {
    console.log('registering '+username);
  }

  setLogin = (username) => {
    if (username) {
      this.setState({isAuthenticated: true, activeUsername: username
      // set activeUser: ... ?
      });
    }
    else {
      this.setState({isAuthenticated: false, activeUsername: 'nobody', activeUser: ''});
    }
  }

  render() {
    const LoginForm = Form.create()(Login);   // can i put this in the Login.js
    const RegistrationForm = Form.create()(Register);  // can i put this in Register.js

    return (
      <BrowserRouter >
        <div>
          <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }} >
                  <Menu.Item key="1"><NavLink to="/login" activeClassName="active">Login/Logout</NavLink></Menu.Item>
                  <Menu.Item key="2"><NavLink to="/loans" activeClassName="active">Loan Admin</NavLink></Menu.Item>
                  <Menu.Item key="3"><NavLink to="/myloans" activeClassName="active">My Loans</NavLink></Menu.Item>
                  <Menu.Item key="4"><NavLink to="/users" activeClassName="active">User Admin</NavLink></Menu.Item>
                  <Menu.Item key="5"><NavLink to="/friends" activeClassName="active">Friends</NavLink></Menu.Item>
                  <Menu.Item key="6"><NavLink to="/profile" activeClassName="active">My Profile</NavLink></Menu.Item>
                  <Menu.Item key="7"><NavLink to="/about" activeClassName="active">About</NavLink></Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Route exact path="/" render={() => ( <Redirect to="/about"/>)} />
                <Route path="/login" render={(props) => <LoginForm {...props} activeUserName={this.state.activeUsername} loginCallback={this.setLogin} /> } />
                <Route path="/register" render={(props) => <RegistrationForm {...props} registerCallback={this.setRegister} /> } />
                <Route path="/loans" render={(props) => <Loans {...props}  />} />
                <Route path="/myloans" render={(props) => <Loans {...props} activeUser={this.state.activeUser} />} />
                <Route path="/users" render={(props) => <Users {...props}  />} />
                <Route path="/friends" render={(props) => <Users {...props} activeUser={this.state.activeUser} />} />
                <Route path="/profile" render={(props) => <Profile {...props} activeUser={this.state.activeUser} registerCallback={this.setRegister}/>} />
                <Route path="/about" component={About} />
              </div>
            </Content>
            <Content style={{ textAlign: 'center' }}>
              <div style={{  padding: 6, minHeight: 30 }}>
                  Logged In: {this.state.activeUsername}
              </div>
            </Content>
            <Footer style={{ background: '#ddd', textAlign: 'center' }}>©2018 Doug Foo</Footer>
          </Layout>
        </div>  
      </BrowserRouter>
    );
  }
}

export default App;

