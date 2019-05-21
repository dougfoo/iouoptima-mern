import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import About from './components/pages/About';
import Loans from './components/Loans';
import Customers from './components/Customers';
import Users from './components/Users';
import AddCustomer from './components/AddCustomer';
import AddLoan from './components/AddLoan';
import Login from "./components/Login";
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
        email: 'doug.foo@gmail.com',
        password: 'abcd'
      },
      {
        id: 2,
        name: 'roxy',
        email: 'foxy.foo@gmail.com',
        password: '1234'

      },
      {
        id: 3,
        name: 'robby jones',
        email: 'rober@gmail.com',
        password: 'ab12'
      }
    ],
    loans: [
      {
        id: 1,
        email: 'jon@gmailcom',
        amount: '333',
        desc: 'loan 1',
        completed: false
      },
      {
        id: 2,
        email: 'jason@gmailcom',
        amount: '13',
        desc: 'loan 2',
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

  // Toggle Complete (rename to markLoanComplete)
  markComplete = (id) => {
    this.setState({ 
      loans: this.state.loans.map(loan => {
        if(loan.id === id) {
          loan.completed = !loan.completed
        }
        return loan;
      })
    });
  }

  // Delete Customer
  delCustomer = (id) => {
    // axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    //   .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));

    console.log('delete '+id)
    this.setState(state => {
      let customers = this.state.customers.filter(i => i.id !== id)
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
  addLoan = (email, amount, desc) => {
    console.log('addLoan '+amount+','+email+','+desc);
    this.setState(state => {
      const nextid = 4   // temp 4 need to get next one
      const loans = this.state.loans.concat({ id: nextid, email: email, amount: amount, desc: desc})
      return {
        loans,
      }
    });
  }

  // delete or maybe Mark loan is better
  delLoan = (id) => {
    console.log('delete ' + id)
    this.setState(state => {
      let loans = this.state.loans.filter(i => i.id !== id)
      return {
        loans,
      }
    });
  }

  onSearch = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Router>
        <div className="App">
          <div className="header">
            <MenuLayout {...this.props} />
          </div>
          <div className="container">
            <Route path="/login/" component={Login} />
            <Route path="/users/" render={props => (
                <Users {...props} users={this.state.customers} />
            )} />
            <Route path="/users2/" render={props => (
                <Customers {...props} addCustomer={this.addCustomer} customers={this.state.customers} delCustomer={this.delCustomer} />
            )} />
            <Route  path="/loans/" render={props => (
              <React.Fragment>
                <AddLoan addLoan={this.addLoan} />
                <form>Insert Search Filter Here
                  <input type="text" name="searchLoan" style={{ flex: '10', padding: '5px' }}
                    placeholder="Loan search.." value="" onChange={this.onSearch}
                  />
                </form>

                {/* should build better custom loan-table component or redo Loans component 
                    something like this:  https://codepen.io/gregbarozzi/pen/XXMBLM?editors=0010
                */}
                <table style={{ borderSpacing: '5', border: '1px solid black', width: '100%' }}>
                  <tbody>
                    <Loans markComplete={this.markComplete} loans={this.state.loans} />
                  </tbody>
                </table>
              </React.Fragment>
            )} />
            <Route  path="/loans2/" render={props => (
              <Loans {...props} markComplete={this.markComplete} loans={this.state.loans} /> 
            )} />
            <Route path="/about/" component={About} />
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
