import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddLoan extends Component {
  state = {
    email: '',
    amount: 0,
    desc: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ email: '', amount: '', desc: ''});
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input type="text" name="email" style={{ flex: '10', padding: '5px' }} 
         placeholder="Loan email.."   value={this.state.email}          onChange={this.onChange}
        />
        <input type="text" name="amount" style={{ flex: '10', padding: '5px' }}
          placeholder="Loan amount.." value={this.state.amount} onChange={this.onChange}
        />
        <input type="text" name="desc" style={{ flex: '10', padding: '5px' }}
          placeholder="Loan desc.." value={this.state.desc} onChange={this.onChange}
        />
        <input  type="submit" value="Submit" className="btn" style={{flex: '1'}} />
      </form>
    )
  }
}

// PropTypes
AddLoan.propTypes = {
  addLoan: PropTypes.func.isRequired
}

export default AddLoan
