import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import AddLoan from './components/AddLoan';
import About from './components/pages/About';
import Loans from './components/Loans';
// import uuid from 'uuid';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    todos: [
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
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  // Delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  // Add Todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  }

  // Add Loan
  addLoan = (title) => {
  }

  render() {
    console.log('todos state')
    console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
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
