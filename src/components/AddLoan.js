import React, { Component } from 'react';
import PropTypes from 'prop-types';

function validate(email) {
  // check if email address is in list of email addresses?  later
  return {
    email: email.length === 0 || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
  }
}

export class AddLoan extends Component {
  state = {
    email: '',
    amount: '',
    desc: '',
    completed: false    
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addLoan(this.state.email, this.state.amount, this.state.desc);
    this.setState({ email: '', amount: '', desc: '', completed: false});
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const errors = validate(this.state.email);
    const isEnabled = !Object.keys(errors).some(x => errors[x]);

    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input type="text" name="email" style={{ flex: '10', padding: '5px' }} 
         placeholder="Loan email.."   value={this.state.email} onChange={this.onChange}
         className={errors.email ? "error" : ""}
        />
        <input type="text" name="amount" style={{ flex: '10', padding: '5px' }}
          placeholder="Loan amount.." value={this.state.amount} onChange={this.onChange}
        />
        <input type="text" name="desc" style={{ flex: '10', padding: '5px' }}
          placeholder="Loan desc.." value={this.state.desc} onChange={this.onChange}
        />
        <button type="submit" disabled={!isEnabled}>Add New Loan</button>
      </form>
    )
  }
}

// PropTypes
AddLoan.propTypes = {
  addLoan: PropTypes.func.isRequired
}

export default AddLoan
