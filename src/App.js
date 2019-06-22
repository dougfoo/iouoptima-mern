import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './pages/About';
import Login from "./pages/Login";
import Signup from "./containers/Signup";
import MenuLayout from './containers/MenuLayout';

// import uuid from 'uuid';
import './App.css';

class App extends Component {
  state = {
    users: [
      {
        id: 1,
        firstName: 'doug',
        lastName: 'foo',
        phone: '650-629-9731',
        email: 'doug.foo@gmail.com',
        friends: [],
        password: 'abcd'
      },
      {
        id: 2,
        firstName: 'foxy',
        lastName: 'foo',
        phone: '519-629-9731',
        email: 'foxy.foo@gmail.com',
        friends: [],
        password: '1234'

      },
      {
        id: 3,
        firstName: 'rob',
        lastName: 'weber',
        phone: '81-800-6329-9731',
        email: 'rober@gmail.com',
        friends: [],
        password: 'ab12'
      }
    ],
    loans: [
      {
        id: 1,
        payee: 1,
        payor: 2,
        date: '2019-05-05',
        amount: '333.50',
        description: 'loan 1',
        status: 'P'
      },
      {
        id: 2,
        payee: 2,
        payor: 3,
        date: '2019-06-05',
        amount: '100',
        description: 'loan 2',
        status: 'A'
      }
    ]

  };

  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  // componentDidMount() {
  //   axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
  //     .then(res => this.setState({ todos: res.data }))
  // }

  render() {
    return (
      <div classfirstName="App">
        <MenuLayout {...this.props} />
      </div>  
    );
  }
}

export default App;

