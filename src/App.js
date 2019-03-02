import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Loans from './components/Loans';
import Customers from './components/Customers';
import AddCustomer from './components/AddCustomer';
import AddLoan from './components/AddLoan';
// import uuid from 'uuid';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    customers: [
      {
        id: 1,
        title: 'customer 1 doug',
        completed: false
      },
      {
        id: 2,
        title: 'cust 2 john',
        completed: true
      }
    ],
    loans: [
      {
        id: 1,
        title: 'loan 1',
        completed: false
      },
      {
        id: 2,
        title: 'loan 2',
        completed: true
      }
    ]

  };

  // componentDidMount() {
  //   axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
  //     .then(res => this.setState({ todos: res.data }))
  // }

  // Toggle Complete
  markComplete = (id) => {
    // this.setState({ todos: this.state.todos.map(todo => {
    //   if(todo.id === id) {
    //     todo.completed = !todo.completed
    //   }
    //   return todo;
    // }) });
  }

  // Delete Customer
  delCustomer = (id) => {
    // axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    //   .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  // Add Todo
  addCustomer = (title) => {
    // axios.post('https://jsonplaceholder.typicode.com/todos', {
    //   title,
    //   completed: false
    // })
    //   .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  }

  // Add Loan
  addLoan = (title) => {
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddCustomer addCustomer={this.addCustomer} />
                <Customers customers={this.state.customers} markComplete={this.markComplete} delCustomer={this.delCustomer} />
              </React.Fragment>
            )} />
            <Route exact path="/loans" render={props => (
              <React.Fragment>
                <AddLoan addLoan={this.addLoan} />
                <Loans loans={this.state.loans} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>  
        </div>
      </Router>
    );
  }
}

export default App;
