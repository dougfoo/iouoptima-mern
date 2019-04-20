import React, { Component } from 'react';
import PropTypes from 'prop-types';

function validate(email) {
  // true means invalid, so our conditions got reversed
  return {
//    email: email.length === 0,
    email: email.length === 0 || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
  }
}

export class AddCustomer extends Component {
  state = {
    name: '',
    email: ''
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addCustomer(this.state.name, this.state.email);
    console.log('onSubmit '+ this.state )
    this.setState({ name: '' , email: '' });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value, });  // how to set 2 values ? do we need this ?

  render() {
    const errors = validate(this.state.email);
    const isEnabled = !Object.keys(errors).some(x => errors[x]);

    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input 
          type="text" name="name" style={{ flex: '10', padding: '5px' }}
          placeholder="Add Name" value={this.state.name}
          onChange={this.onChange}
        />
        <input type="text" name="email" style={{ flex: '10', padding: '5px' }}
          placeholder="Email ID"  value={this.state.email}
          className={errors.email ? "error" : ""}
          onChange={this.onChange}
        />
        <button type="submit" disabled={!isEnabled}>Add New User</button>
      </form>
    )
  }
}

// PropTypes
AddCustomer.propTypes = {
  addCustomer: PropTypes.func.isRequired
}

export default AddCustomer
