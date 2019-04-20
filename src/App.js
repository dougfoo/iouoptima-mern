import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import About from './components/pages/About';
import Loans from './components/Loans';
import Customers from './components/Customers';
import AddCustomer from './components/AddCustomer';
import AddLoan from './components/AddLoan';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import 'antd/dist/antd.css';
import * as actions from './store/actions/auth';
import MenuLayout from './containers/MenuLayout';

// import uuid from 'uuid';
import './App.css';

class App extends Component {
  state = {
    customers: [
      {
        id: 1,
        name: 'doug foo',
        email: 'doug.foo@gmail.com'
      },
      {
        id: 2,
        name: 'roxy',
        email: 'foxy.foo@gmail.com'
      },
      {
        id: 3,
        name: 'robby jones',
        email: 'rober@gmail.com'
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

  componentDidMount() {
    this.props.onTryAutoSignup();
  }
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

    console.log('delete '+id)
    this.setState(state => {
      let customers = this.state.customers.filter(i => i.id != id)
      return {
        customers,
      }
    });
  }

  // Add Todo
  addCustomer = (name, email) => {
    // axios.post('https://jsonplaceholder.typicode.com/todos', {
    //   title,
    //   completed: false
    // })
    //   .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
    console.log('addCustomer ' + name + ' - '+ email)
    this.setState(state => {
      const nextid = 4   // temp 4 need to get next one
      const customers = this.state.customers.concat({ id: nextid, name: name, email: email })
      return {
        customers,    
      }
    });
    console.log(this.state.customers)
  }

  // Add Loan
  addLoan = (amount, email, desc) => {
    console.log('addLoan '+amount+','+email+','+desc);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <MenuLayout {...this.props}>
              <Route exact path="/login/" component={Login} />
              <Route exact path="/signup/" component={Signup} />
            </MenuLayout>
            <Route exact path="/users/" render={props => (
              <React.Fragment>
                <AddCustomer addCustomer={this.addCustomer} />
                <Customers customers={this.state.customers} delCustomer={this.delCustomer} />
              </React.Fragment>
            )} />
            <Route exact path="/loans/" render={props => (
              <React.Fragment>
                <AddLoan addLoan={this.addLoan} />
                <Loans loans={this.state.loans} />
              </React.Fragment>
            )} />
            <Route exact path="/about/" component={About} />
            <Route exact path="/" component={About} />
          </div>  
        </div>
      </Router>
    );
  }
}

// export default App;

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
